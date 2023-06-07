// if(user && user.email){
//     const cartItem = {menuItemId: _id, name, image, price, email: user.email}
//     fetch('http://localhost:5000/carts', {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify(cartItem)
//     })
//     .then(res => res.json())
//     .then(data => {
//         if(data.insertedId){
//             refetch(); // refetch cart to update the number of items in the cart
//             Swal.fire({
//                 position: 'top-end',
//                 icon: 'success',
//                 title: 'Food added on the cart.',
//                 showConfirmButton: false,
//                 timer: 1500
//               })
//         }
//     })
// }


/* {   "_id": "",
"Class name": "",
"Class image": "",
"Instructor name": "",
"Instructor email": "",
"Instructor image": ""
"Available seats": 10,
"Price": 200
} */