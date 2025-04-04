import { Products_Url, Upload_Url } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const productSlice=apiSlice.injectEndpoints({

    endpoints:(builder)=>({
            getProducts:builder.query({
                query:({pageNumber,keyword})=>({

                    url:Products_Url,
                    params:{keyword,
                        pageNumber
                    }
                }),
                keepUnusedDataFor:5,
                invalidatesTags:['Product']

            }),
            getProductDetails:builder.query({
                    query:(id)=>({
                        url:Products_Url+`/${id}`
                    }),
                    keepUnusedDataFor:5,
            }),
            createProduct:builder.mutation({
                query:()=>({
                    url:Products_Url,
                    method:"POST"
                }),
                invalidatesTags:['Products']
            }),
            updateProduct:builder.mutation({
                query:(data)=>({
                    url:`${Products_Url}/${data.id}`,
                    method:"PUT",
                    body:data
                }),
                invalidatesTags:['Product']
            }),
            UploadProductImg:builder.mutation({
                query:(data)=>({
                    url:Upload_Url,
                    method:"POST",
                    body:data
                })
            }),
            DeleteProduct:builder.mutation({
                query:(id)=>({
                    url:`${Products_Url}/${id}`,
                    method:"DELETE"
                })
            }),
            AddReview:builder.mutation({
                query:(data)=>({

                    url:`${Products_Url}/${data.productId}/reviews`,
                    method:"POST",
                    body:data
                }),
                invalidatesTags:['Product']
            }),
            getTopProducts:builder.query({
                query:()=>({
                    url:`${Products_Url}/top`
                }),
                keepUnusedDataFor:5
            })
            
    }),
})

export const {useGetProductsQuery, 
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImgMutation
    ,useDeleteProductMutation,
    useGetTopProductsQuery,
        useAddReviewMutation}=productSlice;
