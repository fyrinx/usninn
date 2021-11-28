import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
      //Students
    {
      path: "/students",
      alias: "/students",
      name: "students",
      component: () => import("./components/StudentList")
    },
    {
      path: "/students/:id/edit",
      name: "student-edit",
      component: () => import("./components/EditStudent")
    },
    {
      path: "/students/:id",
      name: "student-details",
      component: () => import("./components/Student")
    },
    {
      path: "/students/add",
      name: "addStudent",
      component: () => import("./components/AddStudent")
    },
    //Tools
    {
        path: "/tools",
        alias: "/tools",
        name: "tools",
        component: () => import("./components/ToolList")
      },
      {
        path: "/tools/:id",
        name: "tool-detail",
        component: () => import("./components/Tool")
      },
      {
        path: "/tools/add",
        name: "addTool",
        component: () => import("./components/AddTool")
      }
  ]
});