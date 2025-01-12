export default function TestButton() {
  const sendRequest = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("response");
      } else {
        console.error("Failed to communicate with backend");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return <button onClick={sendRequest}>Test</button>;
}
