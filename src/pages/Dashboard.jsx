import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAdminDetails, updateAdminDetails } from '../Api';
import './Dashboard.css';
import Graph from '../components/Graph';

const Dashboard = () => {
  const { userId, token } = useParams();
  const [adminDetails, setAdminDetails] = useState(null);
  const [chargeOption, setChargeOption] = useState();
  const [songreq0, setSongreq0] = useState('');
  const [songreq1, setSongreq1] = useState('');
  const [songreq2, setSongreq2] = useState('');
  const [songreq3, setSongreq3] = useState('');
  const [songreq4, setSongreq4] = useState('');

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // State to store the original data received from the API
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await getAdminDetails(userId, token);
        setAdminDetails(details);

        if (details && details.data) {
          const { charge_customers, amount } = details.data;


          setChargeOption(charge_customers);


          setSongreq0(amount.category_6.songreq0);
          setSongreq1(amount.category_7.songreq1);
          setSongreq2(amount.category_8.songreq2);
          setSongreq3(amount.category_9.songreq3);
          setSongreq4(amount.category_10.songreq4);

          // Save the original data
          setOriginalData({
            category_6: amount.category_6.songreq0,
            category_7: amount.category_7.songreq1,
            category_8: amount.category_8.songreq2,
            category_9: amount.category_9.songreq3,
            category_10: amount.category_10.songreq4,
          });

        }
      } catch (error) {
        console.error('Error fetching admin details:', error);
      }
    };

    fetchDetails();
  }, [userId, token]);


  const customSongRequest = (e) => {
    const value = e.target.value;

    // Check if the input is a number and more than 99
    const isInputValid = /^\d+$/.test(value) && parseInt(value, 10) > 99;

    setSongreq0(value);
    setIsButtonDisabled(!isInputValid);
  };

  const regSongReq1 = (e) => {
    const value = e.target.value;

    // Check if the input is a number and more than 99
    const isInputValid = /^\d+$/.test(value) && parseInt(value, 10) > 79;

    setSongreq1(value);
    setIsButtonDisabled(!isInputValid);
  };
  const regSongReq2 = (e) => {
    const value = e.target.value;

    // Check if the input is a number and more than 99
    const isInputValid = /^\d+$/.test(value) && parseInt(value, 10) > 59;

    setSongreq2(value);
    setIsButtonDisabled(!isInputValid);
  };
  const regSongReq3 = (e) => {
    const value = e.target.value;

    // Check if the input is a number and more than 99
    const isInputValid = /^\d+$/.test(value) && parseInt(value, 10) > 39;

    setSongreq3(value);
    setIsButtonDisabled(!isInputValid);
  };
  const regSongReq4 = (e) => {
    const value = e.target.value;

    // Check if the input is a number and more than 99
    const isInputValid = /^\d+$/.test(value) && parseInt(value, 10) > 19;

    setSongreq4(value);
    setIsButtonDisabled(!isInputValid);
  };



  const updateSongreq = async () => {
    try {
      // Make a PUT request to update the data using the dedicated function
      await updateAdminDetails(userId, token, {

        amount: {
          category_6: songreq0,
          category_7: songreq1,
          category_8: songreq2,
          category_9: songreq3,
          category_10: songreq4,
        },
      });


      // Optionally, you can fetch the updated data again and set it to state
      const updatedDetails = await getAdminDetails(userId, token);
      setAdminDetails(updatedDetails);

      console.log('Data updated successfully!');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  // Use the updated or original data based on the chargeOption
  const graphData = chargeOption === 'no' ? originalData : {
    category_6: songreq0,
    category_7: songreq1,
    category_8: songreq2,
    category_9: songreq3,
    category_10: songreq4,
  };

  return (
    <div>
      {adminDetails && (
        <div className="dashboard-container">
          <h2 className="dashboard-heading">{adminDetails.data.name},   {adminDetails.data.location} on Dhun Jam</h2>

          {/* Div 1 */}
          <div className="flexible-div">
            <div className='leftdiv'>
              <label>Do you want to charge your customers for requesting songs ?</label>
            </div>
            <div className='radiobuttons rightdiv'>
              <label className='leftradio'>
                <input
                  type="radio"
                  name="charge"
                  value="yes"
                  checked={chargeOption === true}
                  onChange={() => setChargeOption(true)}
                />
                Yes
              </label>
              <label className='leftradio'>
                <input
                  type="radio"
                  name="charge"
                  value="no"
                  checked={chargeOption === false}
                  onChange={() => setChargeOption(false)}
                />
                No
              </label>

            </div>
          </div>

          {/* Div 2 */}
          <div className="flexible-div">
            <div className='leftdiv'>
              <label>Custom song request amount- </label>
            </div>
            <div className='rightdiv secondrightdiv'>


              <input
                type="number"
                placeholder={adminDetails.data.amount.category_6}
                defaultValue={adminDetails.data.amount.category_6}
                onChange={customSongRequest}
                className='inputone'
                disabled={chargeOption === 'no'}
              />
            </div>
          </div>

          {/* Div 3 */}
          <div className="flexible-div">
            <div className='leftdiv'>
              <label>Regular song request amounts, from high to low-</label>
            </div>
            <div className='regularsongdiv rightdiv fourdivsfield'>
              <input
                type="number"
                placeholder={adminDetails.data.amount.category_7}
                defaultValue={adminDetails.data.amount.category_7}
                onChange={regSongReq1}
                className='inputone'
                disabled={chargeOption === 'no'}
              />

              <input
                type="number"
                placeholder={adminDetails.data.amount.category_8}
                defaultValue={adminDetails.data.amount.category_8}
                onChange={regSongReq2}
                className='inputone'
                disabled={chargeOption === 'no'}
              />


              <input
                type="number"
                placeholder={adminDetails.data.amount.category_9}
                defaultValue={adminDetails.data.amount.category_9}
                onChange={regSongReq3}
                className='inputone'
                disabled={chargeOption === 'no'}
              />

              <input
                type="number"
                placeholder={adminDetails.data.amount.category_10}
                defaultValue={adminDetails.data.amount.category_10}
                onChange={regSongReq4}
                className='inputone'
                disabled={chargeOption === 'no'}
              />
            </div>
          </div>

          {/* Div 4 - Graph */}
          <div className="graph-container">

            {chargeOption !== false && <Graph
              category6={adminDetails.data.amount.category_6}
              category7={adminDetails.data.amount.category_7}
              category8={adminDetails.data.amount.category_8}
              category9={adminDetails.data.amount.category_9}
              category10={adminDetails.data.amount.category_10}
            />}
          </div>

          {/* Div 5 - Button */}
          <div className="flexible-div">

          <button
          className={`dashboard-button ${chargeOption === false ? 'greyed-out' : ''} ${isButtonDisabled ? 'disabled' : ''}`}
          disabled={chargeOption === false || isButtonDisabled}
          style={{ backgroundColor: chargeOption === false ? '#C2C2C2' : isButtonDisabled ? '#C2C2C2' : '#6741D9' }}
          onClick={updateSongreq}
        >
          Save
        </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
