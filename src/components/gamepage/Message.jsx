// import React from 'react';

// const Message = ({ type, msg, fromId, toId }) => {
//   if (type === 'DirectChat') {
//     return (
//       <div className="DirectChat">
//         {fromId} : {msg}
//       </div>
//     );
//   }
//   if (type === 'MyDM') {
//     return (
//       <div className="MyChatBox">
//         <div className="MyDM">
//           DM to {toId} : {msg}
//         </div>
//       </div>
//     );
//   }
//   if (type === 'ServerChat') {
//     return (
//       <>
//         <div className="NickName">{fromId}</div>
//         <div className="ServerChat">{msg}</div>
//       </>
//     );
//   }
//   if (type === 'MyChatBox') {
//     return (
//       <div className="MyChatBox">
//         <div>ME</div>
//         <div className="MyChat">{msg}</div>
//       </div>
//     );
//   }

//   return <div className={type}>{msg}</div>;
// };

// export default Message;

import { Box } from '@mui/material';
import React from 'react';

export default function Message() {
  return (
    <>
      <Box sx={{ textAlign: 'right', mr: 3 }}>
        <Box sx={{ display: 'inline-block', textAlign: 'left' }}>
          닉네임
          <Box
            sx={{
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#943B3B',
              height: '50px',
              width: '100%',
              p: 1,
              mb: 3,
              borderRadius: '5px',
            }}
          >
            내가 진짜 범인이 아니라니까 존나 뭐라고 그러네
          </Box>
        </Box>
      </Box>

      <Box sx={{ textAlign: 'left', ml: 3 }}>
        <Box sx={{ display: 'inline-block', textAlign: 'right' }}>
          닉네임
          <Box
            sx={{
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#E1E1E1',
              height: '50px',
              width: '100%',
              p: 1,
              mb: 3,
              borderRadius: '5px',
            }}
          >
            내가 진짜 범인이 아니라니까 존나 뭐라고 그러네
          </Box>
        </Box>
      </Box>
    </>
  );
}
