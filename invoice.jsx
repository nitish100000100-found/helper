function App() {

  const downloadInvoice = async () => {

    try {

      const response = await fetch(
        "http://localhost:3000/invoice"
      );

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = "invoice.pdf";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div>

      <h1>Invoice Download</h1>

      <button onClick={downloadInvoice}>
        Download Invoice
      </button>

      <br />
      <br />

    

      <br />
      <br />

      {/* Direct Download Link */}
      <a
        href="http://localhost:3000/invoice"
    
      >
        Download PDF With Link
      </a>

    </div>
  );
}

export default App;