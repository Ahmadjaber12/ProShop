import {  Users_Url } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const userSlice=apiSlice.injectEndpoints({

    endpoints:(builder)=>({
            login:builder.mutation({
                query:(data)=>({

                    url:`${Users_Url}/login`,
                    method:"POST",
                    body:data
                })
                }),
                register:builder.mutation({
                    query:(data)=>({
                        url:`${Users_Url}/register`,
                        method:"POST",
                        body:data
                    })
                }),
            logout:builder.mutation({
                query:()=>({
                    url:`${Users_Url}/logout`,
                    method:"POST"
                })
            }),
            profile:builder.mutation({
                query:(data)=>({
                    url:`${Users_Url}/profile`,
                    method:"PUT",
                    body:data
                })
            }),
            getAdminUsers:builder.query({
                query:()=>({

                    url:Users_Url
                }),
                providesTags:['Users'],
                keepUnusedDataFor:true
            }),
            deleteUser:builder.mutation({
                query:(id)=>({

                    url:`${Users_Url}/${id}`,
                    method:"DELETE"
                })
            }),
            getUserById:builder.query({
                query:(id)=>({

                    url:`${Users_Url}/${id}`

                }),
                keepUnusedDataFor:5
            }),
            UpdateUser:builder.mutation({
                query:(data)=>({

                    url:`${Users_Url}/${data.userId}`,
                    method:"PUT",
                    body:data
                }),
                invalidatesTags:['User']
            })
        
    }),
})

export const {useGetUserByIdQuery,useUpdateUserMutation,useLoginMutation, useLogoutMutation, useRegisterMutation,useProfileMutation,useGetAdminUsersQuery,useDeleteUserMutation}=userSlice;
