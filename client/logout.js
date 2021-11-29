// checkSession = async () => {
//   const response = await axios.get('http://localhost:4040/authenticate', { withCredentials: true })
//   const data = response.data
//   if(data.username){
//     let {id, user_name } = data
//     let html = `
//     <span class='user-name'>Welcome, ${user_name}!</span>
//     <button id='logout-btn' onclick='logout()'>Log Out</button>
//     `
//     document.getElementById('session-container').innerHTML = html
//   }
// }

// document.addEventListener('DOMContentLoaded', checkSession)