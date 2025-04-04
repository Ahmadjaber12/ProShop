import { apiSlice } from "./apiSlice";
import { Orders_Url, PayPals_Url } from "../constants";

export const orderApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createOrder:builder.mutation({
            query:(order)=>({
                url:Orders_Url,
                method:"POST",
                body:{...order}
            })
        }),
        getOrderById:builder.query({
                query:(Id)=>({
                    url:`${Orders_Url}/${Id}`,
                }),
                keepUnusedDataFor:5
        }),
        payOrder:builder.mutation({
            query:({orderId,details})=>({
                url:`${Orders_Url}/${orderId}/pay`,
                method:"PUT",
                body:{...details}
            })
        }),
        getPaypalClientId:builder.query({
            query:()=>({
                url:PayPals_Url
            }),
            keepUnusedDataFor:5
        }),
        getMyOrders:builder.query({
            query:()=>({
                url:Orders_Url

            })
        }),
        getOrders:builder.query({
            query:()=>({
                url:`${Orders_Url}/admin`
            }),
            keepUnusedDataFor:5
        }),
        deliveredOrder:builder.mutation({
            query:(id)=>({
                    url:`${Orders_Url}/admin/updatetodelivered/${id}`,
                    method:"PUT"
            })
        })
    })
})

export const {useDeliveredOrderMutation,useGetOrdersQuery,useCreateOrderMutation,useGetOrderByIdQuery, useGetPaypalClientIdQuery,usePayOrderMutation,useGetMyOrdersQuery}=orderApiSlice