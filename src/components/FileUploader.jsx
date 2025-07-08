import React, { useState } from "react";
import axios from "axios";
import ErrorWindow from "./errorWindow";

export default function FileUploader() {
  const [file, setFile] = useState(null);
  const [inputText, setInputText] = useState("");
  const [status, setStatus] = useState("idle");
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [mode, setMode] = useState("choose"); // "choose", "file", "text"

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const validTypes = ["text/plain", "application/pdf"];
      if (!validTypes.includes(selectedFile.type)) {
        setStatus("FormatError");
        setErrorMessage("Formato não suportado. Envie um arquivo .txt ou .pdf.");
        setFile(null);
      } else {
        setFile(selectedFile);
        setStatus("idle");
      }
    }
  }

  async function handleUpload() {
    if (!file) return;

    setStatus("Uploading");

    const data = new FormData();
    data.append("file", file);

    try {
      const res = await axios.post("https://desafio-gw0w.onrender.com/Content", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setStatus("Uploaded");
      setResponseMessage(res.data.message);
    } catch (error) {
      console.log(error);
      setErrorMessage("Erro ao enviar o arquivo. Tente novamente.");
      setStatus("notUploaded");
    }
  }

  async function handleTextSubmit() {
    if (!inputText.trim()) return;

    setStatus("Uploading");

    try {
      const res = await axios.post("https://desafio-gw0w.onrender.com", { text: inputText });
      setStatus("Uploaded");
      setResponseMessage(res.data.message);
    } catch (error) {
      console.log(error);
      setErrorMessage("Erro ao enviar o texto. Tente novamente.");
      setStatus("notUploaded");
    }
  }

  function closeError() {
    setStatus("idle");
    setErrorMessage("");
  }

  function resetInterface() {
    setMode("choose");
    setFile(null);
    setInputText("");
    setStatus("idle");
    setErrorMessage("");
    setResponseMessage("");
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-xl space-y-8">
      {mode === "choose" && (
        <>
          <div className="w-full bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg shadow-md text-left text-gray-700 space-y-3 break-words">
            <h2 className="text-xl font-bold text-blue-800">Como funciona a interface?</h2>
            <p className="text-sm leading-relaxed">
              Esta interface permite que você envie <span className="font-semibold">um arquivo .txt ou .pdf</span>,
              ou digite <span className="font-semibold">um texto manualmente</span> para ser processado.
            </p>
            <ul className="list-disc pl-6 text-sm space-y-1">
              <li>
                <span className="font-semibold">Upload de Arquivo:</span> selecione um arquivo válido e clique em <em>Upload</em>.
              </li>
              <li>
                <span className="font-semibold">Texto Manual:</span> digite ou cole seu texto e clique em <em>Enviar Texto</em>.
              </li>
            </ul>
            <p className="text-sm leading-relaxed">
              O sistema irá processar o conteúdo e exibir a resposta. Se houver algum erro, uma janela de aviso será mostrada.
            </p>
          </div>

          <div className="flex gap-8 justify-center">
            <div
              className="w-1/2 p-8 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-xl shadow-xl hover:brightness-110 cursor-pointer transition transform hover:-translate-y-1"
              onClick={() => setMode("file")}
            >
              <h2 className="text-3xl font-extrabold text-center">Upload de Arquivo</h2>
              <p className="text-sm mt-2 text-blue-100 text-center">Envie um arquivo .txt ou .pdf</p>
            </div>

            <div
              className="w-1/2 p-8 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-xl shadow-xl hover:brightness-110 cursor-pointer transition transform hover:-translate-y-1"
              onClick={() => setMode("text")}
            >
              <h2 className="text-3xl font-extrabold text-center">Texto</h2>
              <p className="text-sm mt-2 text-green-100 text-center">Digite um texto para enviar</p>
            </div>
          </div>
        </>
      )}

      {mode === "file" && (
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800">Upload de Arquivo</h2>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-gray-700
              file:mr-4 file:py-2 file:px-6
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-gradient-to-r file:from-blue-400 file:to-blue-600 file:text-white
              hover:file:from-blue-500 hover:file:to-blue-700
              transition cursor-pointer"
          />
          {file && status === "idle" && (
            <button
              className="bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
              onClick={handleUpload}
            >
              Upload
            </button>
          )}
          <button onClick={resetInterface} className="bg-gray-400 text-white px-6 py-3 rounded-full hover:bg-gray-500 transition">
            Voltar
          </button>
        </div>
      )}

      {mode === "text" && (
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800">Entrada de Texto</h2>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={6}
            className="block w-full p-4 text-gray-800 rounded-lg border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition whitespace-pre-wrap break-words"
            placeholder="Digite seu texto aqui..."
          ></textarea>
          <div className="flex gap-6">
            <button
              onClick={handleTextSubmit}
              className="bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Enviar Texto
            </button>
            <button
              onClick={resetInterface}
              className="bg-gray-400 text-white px-6 py-3 rounded-full hover:bg-gray-500 transition"
            >
              Voltar
            </button>
          </div>
        </div>
      )}

      {status === "Uploading" && (
        <div className="flex justify-center items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-blue-500 animate-spin border-4 border-blue-300 border-t-transparent"></div>
          <span className="text-blue-700 font-semibold text-lg">Processando...</span>
        </div>
      )}

      {status === "Uploaded" && (
        <div className="text-gray-700 bg-gray-100 p-4 rounded-lg whitespace-pre-wrap break-words shadow-inner">
          <p className="font-semibold mb-2">Resposta do modelo:</p>
          <p>{responseMessage}</p>
        </div>
      )}

      {(status === "FormatError" || status === "notUploaded") && (
        <ErrorWindow message={errorMessage} onClose={closeError} />
      )}
    </div>
  );
}
