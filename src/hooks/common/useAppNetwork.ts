// import { useOnline } from "@vueuse/core";
// import Swal from "sweetalert2";
// import { watch } from 'vue';

// /**
//  * Returns an object containing the current online status and a watcher that displays a SweetAlert2
//  * message when the online status changes.
//  *
//  * @return {Object} An object containing the current online status and a watcher.
//  * @property {Ref<boolean>} isOnline - A reactive reference to the current online status.
//  */
// export const useAppNetWork = () => {
//     const isOnline = useOnline()

//     watch(isOnline, () => {
//         if(!isOnline.value){
//             Swal.fire({
//                 icon: 'error',
//                 confirmButtonColor: '#004c97',
//                 position: 'top',
//                 title: 'Oops...',
//                 text: 'You are offline. Please check your internet connection.',
//             })
//         }
//         else {
//             Swal.fire({
//                 icon: 'info',
//                 confirmButtonColor: '#004c97',
//                 position: 'top',
//                 text: 'Connection established!',
//             })
            
            
//         }

        

//     })

//     return {
//         isOnline
//     }
// }