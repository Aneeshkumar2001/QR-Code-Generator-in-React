import {useState} from "react";


const QrCode = () => {
    const [img,setImg]=useState("");
    const [loading,setLoading]=useState(false);
    const [qrData,setQrData] = useState("joes")
    const [qrSize,setQrsize]=useState("150");

    async function generateQR(){
        setLoading(true);
        try{
            const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
            setImg(url);

        }catch (error) {
            console.error("Error generating QR Code",error);

        }finally {
            setLoading(false);
        }
    } function downloadQR(){
        fetch(img)
        .then((response)=>response.blob())
        .then((blob)=> {
            const link=document.createElement("a");
            link.href=URL.createObjectURL(blob);
            link.download="QR.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
       
    }
  return (
    <div className="app-container">
        <h1>QR Code Generator</h1>
        {loading && <p>Please wait.....</p>}
      {img &&   <img src={img} className="qr-image" />}
        <div>
            <label htmlFor="dataInput" className="input-label">
                Data for QR Code:
            </label>
            <input type="text" value={qrData} id="dataInput" placeholder="Enter Data for QR Code" onChange={(e)=>setQrData(e.target.value)} />
            <label htmlFor="sizeInput" className="input-label">
                Image size (e.g.,150):
            </label>
            <input type="text" value={qrSize} onChange={(e)=>setQrsize(e.target.value)}id="sizeInput" placeholder="Enter image Size" />
            <button className="Generate-button" disabled={loading} onClick={generateQR}>Generate QR Code</button>
            <button className="Download-button" onClick={downloadQR}>Download QR Code</button>
        </div>
        <p className="footer">Designed by Aneeshkumar</p>
    </div>
  )
}  

export default QrCode
