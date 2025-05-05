import React from 'react';

function Contact() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full text-center space-y-5 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900">Project & License</h2>

        <p className="text-gray-700">
          <strong>Creator:</strong> Wojciech Mierzwa
        </p>

        <p className="text-gray-700">
          This project is released under the <strong>MIT License</strong>. You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software.
        </p>

        <p className="text-gray-700">
          The only condition is that proper attribution is maintained. Please include a reference to <strong>Wojciech Mierzwa</strong> in your project documentation or credits.
        </p>

        <p className="text-gray-700">
          For any questions or collaboration opportunities, feel free to reach out via my 
          <a 
            href="https://github.com/WojciechMierzwa" 
            className="text-blue-600 hover:underline"
          > GitHub profile</a>.
        </p>

        <p className="text-gray-600 italic">Thank you for your interest and support!</p>
      </div>
    </div>
  );
}

export default Contact;
