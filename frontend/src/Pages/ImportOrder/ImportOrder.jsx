import React from 'react'
import './ImportOrder.css'
import MarketStepper from '../../Components/MarketComponents/MarketStepper/MarketStepper'
import ImportOrderTitleBox from '../../Components/MarketComponents/MarketTitleBox/ImportOrderTitleBox/ImportOrderTitleBox'
import ImportFile from '../../Components/MarketComponents/ImportFile/ImportFile'
function ImportOrder() {

    // const [file, setFile] = useState(null);

    // const onFileChange = event => {
    //     setFile(event.target.files[0]);
    // };

    // const onFileUpload = () => {
    //     const formData = new FormData();
    //     formData.append("myFile", file);

    //     // API endpoint where the file is sent
    //     fetch('http://your-api-url/upload', {
    //         method: 'POST',
    //         body: formData,
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('Success:', data);
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });
    // };

    return (
        <div class = 'market'>
            {/* positioning of the container */}
            <div className = "market-title-container">
                 <ImportOrderTitleBox></ImportOrderTitleBox>
            </div>
            <MarketStepper>
        </MarketStepper>
        <ImportFile></ImportFile>
        </div>

    )
}

export default ImportOrder
