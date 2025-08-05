import React from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const MarkdownEditor = () => {
  return (
    <div className="w-1/2 min-w-3xs lg:w-2/3">
      <SimpleMDE placeholder='Description'/>
    </div>
  )
}

export default MarkdownEditor