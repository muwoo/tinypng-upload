# tinypng upload

![image](https://user-images.githubusercontent.com/21073039/41909201-02c933c4-7979-11e8-9c69-5e78f88f4ab3.gif)

![image](https://user-images.githubusercontent.com/21073039/41909498-bb50812c-7979-11e8-82a6-aba99e0eaa3b.gif)

Size comparison before and after compression

<img width="400" alt="83652a0b-1a75-4642-bcc1-cbe7911a4a1f" src="https://user-images.githubusercontent.com/21073039/41909762-70d26786-797a-11e8-8e47-bbbce7bbc349.png">

# Usage

### 1. Download 
First, clone this project and run locally：
```bash
git clone 
cd tinypng-upload
npm i
npm run build
```
After that, you will be able to find an executable program in the build folder. And then run it.

### 2. Configuring tinypng API key 
`tinypng-upload`use tinypng API to compress image,So you need to register an `API Key` in [tinypng](https://tinypng.com/).

<img width="600" src="http://img.souche.com/f2e/3c2825b28b8e2c37f0c36b3b8ed16746.png">

Then add this API key to settings:

<img width="600" src="https://user-images.githubusercontent.com/21073039/41950896-fa103d36-79fa-11e8-939f-c2a76117d5ab.png">


### 3. Configuring upload request
If you need to upload pictures to the server, you must configure these options.

|Property|Decription|Type|Default|
|---|---|---|---|
|action|Upload request URL, required.	| String|-|
|headers|Upload request header.	|Object|{}|
|data|Extra data with upload request.|Object|{}|
|name|The key in upload request targeting to the file.|String|file|
|with-credentials|Enable certification info in Cookie or not.|Boolean|false|


