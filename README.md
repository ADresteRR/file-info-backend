# RapidFort Offline Project
## Content
- [Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [Docker](#Docker)
- [Hosted Service](#HostedService)

#### website : https://adresterr.github.io/anjan-rapidfort-front-end/
#### front-end repo : https://github.com/ADresteRR/anjan-rapidfort-front-end
#### hosted API link: https://rapidfort-back-end-production.up.railway.app

# File Info API
<a name="Description"></a>
## Description

File Info API is an API that returns information about uploaded files. It supports various file types, such as PDF, image, audio, video, and Word documents. It uses different modules to extract information from the files, such as pdf-parse, sharp, sox, fluent-ffmpeg, and mammoth.
<a name="Installation"></a>
## Installation

To install the dependencies for this project, run the following command:

```bash
npm install
```
<a name="Usage"></a>
## Usage

To start the server on port 3000, run the following command:

```bash
node app.js
```

## Endpoints

### POST /upload

Uploads a file and returns information about it.

#### Parameters

| Name | Type | In | Description |
| ---- | ---- | -- | ----------- |
| file | file | formData | The file to upload |

#### Responses

| Status | Description | Schema |
| ------ | ----------- | ------ |
| 200    | OK          | [FileInfo](#fileinfo) |
| 400    | Bad request | [ErrorResponse](#errorresponse) |

#### Examples

##### Request

```bash
curl -F file=@test.pdf http://localhost:3000/upload
```

##### Response

```json
{
  "name": "test.pdf",
  "type": "application/pdf",
  "size": 123456,
  "text": "This is a test PDF file.",
  "metadata": {
    "Title": "Test PDF",
    "Author": "John Doe",
    "CreationDate": "2023-04-05T12:34:56Z"
  }
}
```

## Schemas

### FileInfo

An object containing information about the uploaded file.

| Name       | Type   | Description                                      |
| ---------- | ------ | ------------------------------------------------ |
| name       | string | The original name of the file                    |
| type       | string | The MIME type of the file                        |
| size       | integer| The size of the file in bytes                    |
| text       | string | The extracted text from the file (if applicable) |
| metadata   | object | The metadata of the file (if applicable)         |
| width      | integer| The width of the image in pixels (if applicable) |
| height     | integer| The height of the image in pixels (if applicable)|
| format     | string | The format of the image (if applicable)          |
| duration   | number | The duration of the audio in seconds (if applicable)|
| bitrate    | integer| The bitrate of the audio in kbps (if applicable) |
| resolution | string | The resolution of the video (if applicable)      |
| codec      | string | The codec of the video (if applicable)           |
| paragraphs | integer| The number of paragraphs in the document (if applicable)|
| styles     | array  | The styles used in the document (if applicable)  |

### ErrorResponse

An object containing an error message.

| Name    | Type   | Description         |
| ------- | ------ | ------------------- |
| message | string | The error message   |

<a name="Docker"></a>

## Docker

You can also use this API as a Docker container. To do so, you need to have Docker installed on your machine. Then, you can pull the image from the Docker Hub repository:

```bash
docker pull adresterrjr/rapidfort
```

To run the container on port 3000, use the following command:

```bash
docker run -p 3000:3000 adresterrjr/rapidfort
```

You can then access the API endpoints as described in the [Usage](#usage) section.

<a name="HostedService"></a>
## Hosted Service

You do not need to download the repo or install any dependencies to use this API. You can simply use the hosted service on Railway that is accessible by anyone over the internet. The URL for the hosted service is:

```bash
https://rapidfort-back-end-production.up.railway.app
```

You can use this URL to send requests to the API endpoints as described in the [Usage](#usage) section. For example:

```bash
curl -F file=@test.pdf https://rapidfort-back-end-production.up.railway.app/upload
```


