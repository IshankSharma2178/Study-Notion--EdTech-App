import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import LoginPage from "./pages/LoginPage";
import Navbar from "./component/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivateRoute from "./component/core/HomePage/Auth/PrivateRoute";
import MyProfile from "./component/core/Dashboard/MyProfile";
import Error from "./pages/Error";
import Settings from "./component/core/Dashboard/Setting/Settings";
import EnrolledCourses from "./component/core/Dashboard/EnrolledCourses";
import Cart from "./component/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import CoursesTable from "./component/core/Dashboard/InstructorCourses/CoursesTable";
import AddCourse from "./component/core/Dashboard/AddCourse/AddCourse";
import EditCourse from "./component/core/Dashboard/EditCourse/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./component/core/ViewCourse/videoSlide/VideoDetails";
import InstructorDashboard from "./component/core/Dashboard/InstructorDashboard/InstructorDashboard";
import CourseBar from "./component/core/ViewCourse/ViewCourseForSmScreen/CourseBar";
import SidebarForSmScreen from "./component/core/Dashboard/SideBarForSmScreen/SidebarForSmScreen";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="w-screen min-h-screen bg-[#000814] flex flex-col font-inter overflow-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:id" element={<UpdatePassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
        {user && <Route path="/dashboard" element={<SidebarForSmScreen />} />}

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route
            path="/dashboard/my-profile"
            element={
              <PrivateRoute>
                <MyProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />

          {user?.accountType === ACCOUNT_TYPE.STUDENT ? (
            <>
              <Route
                path="/dashboard/enrolled-courses"
                element={
                  <PrivateRoute>
                    <EnrolledCourses />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/cart"
                element={
                  <PrivateRoute>
                    <Cart />
                  </PrivateRoute>
                }
              />
              <Route path="view-course/:courseId" element={<CourseBar />} />
            </>
          ) : (
            <>
              <Route
                path="/dashboard/my-courses"
                element={
                  <PrivateRoute>
                    <CoursesTable />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/add-course"
                element={
                  <PrivateRoute>
                    <AddCourse />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/edit-course/:courseId"
                element={
                  <PrivateRoute>
                    <EditCourse />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/instructor"
                element={
                  <PrivateRoute>
                    <InstructorDashboard />
                  </PrivateRoute>
                }
              />
            </>
          )}
        </Route>

        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
