// import { Editor } from '@tinymce/tinymce-react';
import { Editor } from '@tinymce/tinymce-react';

function Tiny({ref2,initialValue=''}) {
  return (
    <Editor
      tinymceScriptSrc={import.meta.env.VITE_PUBLIC_API+'/tinymce/tinymce.min.js'}
      apiKey='hpf9h4802a6gu20q61xonxq5tg2r8ot8qw5bmkjuseuw4s9i'
      onInit={(evt, editor) => ref2.current = editor}
      onEditorChange={(newValue)=>{
      }}
      initialValue={initialValue} 
      init={{
        height: "500",
        image_advtab: true,
        plugins: 'preview code searchreplace autolink directionality visualblocks visualchars image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help',
        toolbar1: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
        toolbar: "forecolor backcolor toc charmap",
        file_picker_types: 'file image media',
        file_picker_callback: function (cb, value, meta) {
          var input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');


          input.onchange = function () {
            var file = this.files[0];

            var reader = new FileReader();
            reader.onload = function () {
              var id = 'blobid' + (new Date()).getTime();
              var blobCache = tinymce.activeEditor.editorUpload.blobCache;
              var base64 = reader.result.split(',')[1];
              var blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);

              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          };

          input.click();
        },
      }}
    />
  );
}

export default Tiny;