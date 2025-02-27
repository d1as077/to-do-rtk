import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
    }),
    tagTypes: ["Todos"],
    endpoints: (build) => ({
        getAllTasks: build.query({
            query: () => ({
                url: "/todo"
            }),
            providesTags: ["Todos"]
        }),
        addNewTask: build.mutation({
            query: (newTodo) => ({
                url: "/todo",
                method: "POST",
                body: newTodo
            }),
            invalidatesTags: ["Todos"]
        }),
        editTask: build.mutation({
            query: (updatedTodo) => ({
                url: `/todo/${updatedTodo.id}`,
                method: "PUT",
                body: updatedTodo
            }),
            invalidatesTags: ["Todos"]
        }),
        deleteTask: build.mutation({
            query: (id) => ({
                url: `/todo/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Todos"]
        })
    })
});

export const { useGetAllTasksQuery, useAddNewTaskMutation, useEditTaskMutation, useDeleteTaskMutation } = todoApi;
