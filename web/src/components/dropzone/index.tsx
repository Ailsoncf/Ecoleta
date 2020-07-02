import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'

import Container from './styles'

interface Props {
  onFileUploaded: (file: File) => void
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('')

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]

    const fileUrl = URL.createObjectURL(file)

    setSelectedFileUrl(fileUrl)
    onFileUploaded(file)
  }, [onFileUploaded])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  })

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} accept='image/*' />

      {selectedFileUrl
        ? <img src={selectedFileUrl} alt='Point thumbnail' />
        : (
          <p>
            <FiUpload />
            Imagem do Estabelecimento
          </p>
        )
      }

    </Container>
  )
}

export default Dropzone