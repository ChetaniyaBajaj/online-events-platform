// import React from 'react'
// import conf_room from '../images/conf_room2.jpg'
// import { useEffect } from 'react';
// import { ZoomMtg } from '@zoomus/websdk';
// const KJUR = require('jsrsasign')

// var apiKey = 'J3c4TMQcEJYK5ShCwC7fRKwA3INHFpSZvaka'
// var apiSecret = 'eD7U5GNdxnEb7RN1Q7o1pdbC6znbL3AgjBMt'
// var meetingNumber = '8578607760';
// var leaveUrl = 'http://localhost:3000';
// var userName = 'WebSDK'
// var userEmail = 'test@gmail.com';
// var passWord = 'y5gjZB';
// var signature = ''
// var role = 0;

// function generateSignature(sdkKey, sdkSecret, meetingNumber, role) {

//   const iat = Math.round((new Date().getTime() - 30000) / 1000)
//   const exp = iat + 60 * 60 * 2
//   const oHeader = { alg: 'HS256', typ: 'JWT' }

//   const oPayload = {
//     sdkKey: sdkKey,
//     mn: meetingNumber,
//     role: role,
//     iat: iat,
//     exp: exp,
//     appKey: sdkKey,
//     tokenExp: iat + 60 * 60 * 2
//   }

//   const sHeader = JSON.stringify(oHeader)
//   const sPayload = JSON.stringify(oPayload)
//   const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkSecret)
//   return sdkJWT
// }

// const ZoomMeet = (props) => {
//   useEffect(() => {
//     signature = generateSignature(apiKey, apiSecret, meetingNumber, role);
//     console.log(signature)
//     showZoomDiv();
//     ZoomMtg.setZoomJSLib('https://source.zoom.us/2.4.5/lib', '/av');
//     ZoomMtg.preLoadWasm();
//     ZoomMtg.prepareJssdk();
//     initiateMeet();
//   }, [])

//   const showZoomDiv = () => {
//     document.getElementById("zmmtg-root").style.display = "block";
//   }

//   const initiateMeet = () => {
//     ZoomMtg.init({
//       leaveUrl: leaveUrl,
//       isSupportAV: true,
//       success: (success) => {
//         console.log(success)

//         ZoomMtg.join({
//           signature: signature,
//           meetingNumber: meetingNumber,
//           userName: userName,
//           apiKey: apiKey,
//           userEmail: userEmail,
//           passWord: passWord,
//           success: (success) => {
//             console.log(success)
//           },
//           error: (error) => {
//             console.log(error)
//           }
//         })
//       },
//       error: (error) => {
//         console.log(error)
//       }
//     })
//   }

//   return (
//     <div className="conf-container">
//       <div id="meetingSDKElement">
//         {console.log(props.data)};
//       </div>
//       <img src={conf_room} alt="Conference Room" />
//     </div>
//   )
// }

// export default ZoomMeet
