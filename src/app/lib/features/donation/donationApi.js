"use client";
import { baseApi } from "../baseApi/baseApi";

const donationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDonations: build.query({
      query: ({ searchTerm, page, token, category, limit }) => ({
        url: `/donation-post/post?${
          searchTerm ? `searchTerm=${searchTerm}` : ""
        }${page ? `&page=${page}` : ""}${limit ? `&limit=${limit}` : ""}${
          category ? `&category=${category}` : ""
        }`,
        method: "GET",
        headers: token,
      }),
      providesTags: ["donation"],
    }),
    getSingleDonations: build.query({
      query: ({ id }) => {
        return {
          url: `/donation-post/post/${id}`,
          method: "GET",
        };
      },
      // providesTags: ["donation"],
    }),
    getDonationsCategory: build.query({
      query: () => ({
        url: `/donation-post/category`,
        method: "GET",
      }),
    }),
    deleteDonation: build.mutation({
      query: ({ id }) => ({
        url: `/donation-post/post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
    postDonationPost: build.mutation({
      query: ({ token, ...data }) => ({
        url: `/donation-post/post`,
        method: "POST",
        headers: token,
        body: data,
      }),
    }),
    updateDonationPost: build.mutation({
      query: ({ token, id, ...data }) => ({
        url: `/donation-post/post/${id}`,
        method: "PUT",
        headers: token,
        body: data,
      }),
      invalidatesTags: ["donation"],
    }),
    postUserDonation: build.mutation({
      query: ({ token, ...data }) => {
        return {
          url: `/donation-post/user-donation/`,
          method: "POST",
          // headers: `asdf ${token}`,
          body: data,
        };
      },
      invalidatesTags: ["Post"],
    }),
    getUserDonations: build.query({
      query: ({ token, id }) => {
        return {
          url: `/donation-post/user-donation/${id}`,
          method: "GET",
          // headers: `asdf ${token}`,
          // body: data,
        };
      },
      providesTags: ["Post"],
    }),
    getStatistics: build.query({
      query: () => {
        return {
          url: `/donation-post/statistics`,
          method: "GET",
          // headers: `asdf ${token}`,
          // body: data,
        };
      },
    }),
  }),
  overrideExisting: false,
});
export const {
  useGetDonationsQuery,
  useGetDonationsCategoryQuery,
  usePostDonationPostMutation,
  usePostUserDonationMutation,
  useGetUserDonationsQuery,
  useGetStatisticsQuery,
  useUpdateDonationPostMutation,
  useDeleteDonationMutation,
  useGetSingleDonationsQuery,
} = donationApi;
