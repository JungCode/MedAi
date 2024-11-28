import axios from "axios";

export const getDoctorAdvice = async (
  symptoms: string,
  setConversation: React.Dispatch<
    React.SetStateAction<{ message: string; sender: string }[]>
  >
) => {
  setConversation((prevConversation) => [
    ...prevConversation,
    { message: "", sender: "AI" },
  ]);
  try {
    const response = await fetch("http://localhost:5000/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        queryType: "symptomQuery", // Thêm loại truy vấn
        input: symptoms, // Đặt triệu chứng làm nội dung truy vấn
      }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");
    let advice = "";

    while (true) {
      const result = await reader?.read();
      if (!result) break;
      const { done, value } = result;
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      advice += chunk;
      setConversation((prevConversation) => [
        ...prevConversation.slice(0, -1),
        { message: advice, sender: "AI" },
      ]);
    }
  } catch (error) {
    console.error("Error fetching advice:", error);
    throw new Error("An error occurred while getting advice.");
  }
};

export const prepareData = async (
  personalInfo: string ) => {
  try{
    axios.post('http://localhost:5000/api/prepare-data', {
      personalInfo
    })
  }catch (error) {
    console.error("Error preparing data:", error);
    throw new Error("An error occurred while preparing data.");
  };
}