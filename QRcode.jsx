import React, { useState } from 'react'

function QRcode() {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrdata, setQrdata] = useState("https://google.com");
  const [qrSize, setQrSize] = useState("150");
  async function GenerateQR() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrdata)}`;
      setImg(url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  function downloadQr() {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }).catch((error)=>{
        console.error(error);
      })

  }
  return (
    <div className="app-container">
      <h1>QR GENERATOR</h1>
      {loading && <p>please wait...</p>}
      {img && <img src={img} className="qr-code-img" />}
      <div>
        <label htmlFor='datainput' className='input-label'>source of QRcode</label><input type="text" value={qrdata} id="datainput" onChange={(e) => setQrdata(e.target.value)} />
        <label htmlFor='sizeinput' className='input-label'>Size of QRcode</label><input type="text" id='sizeinput' value={qrSize} onChange={(e) => setQrSize(e.target.value)} />
        <button className='generate' disabled={loading} onClick={GenerateQR}>Generate </button>
        <button className="download" onClick={downloadQr}>Download </button>
      </div>
    </div>

  )
}

export default QRcode
