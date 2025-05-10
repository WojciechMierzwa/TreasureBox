import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Outlet } from 'react-router-dom';
import ProfilePage from './login/ProfilePage';
import CreateUser from './user/pages/manageAccount/CreateUser';
import Hub from './user/pages/Hub';
import LoginPage from './login/LoginPage';
import Video from './user/pages/Video';
import Settings from './user/pages/manageAccount/Settings';
import Movies from './user/pages/Film/Movies';
import MovieDetail from './user/pages/Film/MovieDetails';
import MyList from './user/pages/MyList';
import HubNavbar from './components/HubNavbar';
import CreateFilm from './admin/filmManage/CreateFilm';
import UpdateFilm from './admin/filmManage/UpdateFilm';
import Serie from './user/pages/TVShow/Serie';
import Series from './user/pages/TVShow/Series';
import AdminPanel from './admin/AdminPanel';
import MovieManager from './admin/filmManage/MovieManager';
import SeriesManager from './admin/seriesManage/SeriesManager';
import ViewSeries from './admin/seriesManage/ViewSeries';
import UpdateSerie from './admin/seriesManage/UpdateSerie';
import ManageSeasons from './admin/seriesManage/seasonManage/ManageSeasons';
import CreateEpisode from './admin/seriesManage/episodeManage/CreateEpisode';
import UpdateEpisode from './admin/seriesManage/episodeManage/UpdateEpisode';
import CreateSeason from './admin/seriesManage/seasonManage/CreateSeason';
import UpdateSeason from './admin/seriesManage/seasonManage/UpdateSeason';
import ManageEpisodes from './admin/seriesManage/episodeManage/ManageEpisodes';
import CreateSeries from './admin/seriesManage/CreateSeries';
import UsersManager from './admin/userManage/UsersManager';
import Contact from './user/pages/Contact';
import Dashboard from './user/pages/manageAccount/Dashboard';
import RequireAuth from './components/RequireAuth';

function AppLayout() {
  const location = useLocation();
  const role = localStorage.getItem("role"); 
  const excludedPaths = ["/", "/CreateUser", "/LoginPage"];

  return (
    <>
      {!excludedPaths.includes(location.pathname) && <HubNavbar />}
      <Outlet />
    </>
  );
}

function AppContent() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<ProfilePage />} />
        <Route path="/CreateUser" element={<CreateUser />} />
        <Route path="/LoginPage" element={<LoginPage />} />


        {/* Admin Routes */}
        <Route
          path="/AdminPanel"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <AdminPanel />
            </RequireAuth>
          }
        />

        <Route
          path="/MoviesManager"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <MovieManager />
            </RequireAuth>
          }
        />

        <Route
          path="/create-movie"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <CreateFilm />
            </RequireAuth>
          }
        />

        <Route
          path="/update-movie/:id"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <UpdateFilm />
            </RequireAuth>
          }
        />

        {/* CRUD Series */}
        <Route
          path="/SeriesManager"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <SeriesManager />
            </RequireAuth>
          }
        />

        <Route
          path="/create-series"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <CreateSeries />
            </RequireAuth>
          }
        />

        <Route
          path="/view-series/:id"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <ViewSeries />
            </RequireAuth>
          }
        />

        <Route
          path="/update-series/:id"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <UpdateSerie />
            </RequireAuth>
          }
        />

        {/* CRUD Seasons */}
        <Route
          path="/manage-seasons"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <ManageSeasons />
            </RequireAuth>
          }
        />

        <Route
          path="/create-season"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <CreateSeason />
            </RequireAuth>
          }
        />

        <Route
          path="/update-season/:id"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <UpdateSeason />
            </RequireAuth>
          }
        />

        {/* CRUD Episodes */}
        <Route
          path="/manage-episodes"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <ManageEpisodes />
            </RequireAuth>
          }
        />

        <Route
          path="/create-episode"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <CreateEpisode />
            </RequireAuth>
          }
        />

        <Route
          path="/update-episode/:id"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <UpdateEpisode />
            </RequireAuth>
          }
        />

        {/* CRUD Admin User */}
        <Route
          path="/UsersManager"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <UsersManager />
            </RequireAuth>
          }
        />

      {/* User Routes */}
      <Route
        path="/Hub"
        element={
          <RequireAuth allowedRoles={["user", "admin"]}>
            <Hub />
          </RequireAuth>
        }
      />

      <Route
        path="/Settings"
        element={
          <RequireAuth allowedRoles={["user", "admin"]}>
            <Settings />
          </RequireAuth>
        }
      />

      <Route
        path="/watch/movie"
        element={
          <RequireAuth allowedRoles={["user", "admin"]}>
            <Video mode="movie" />
          </RequireAuth>
        }
      />

      <Route
        path="/watch/episode"
        element={
          <RequireAuth allowedRoles={["user", "admin"]}>
            <Video mode="episode" />
          </RequireAuth>
        }
      />

      <Route
        path="/Movies"
        element={
          <RequireAuth allowedRoles={["user", "admin"]}>
            <Movies />
          </RequireAuth>
        }
      />

      <Route
        path="/Movies/:id"
        element={
          <RequireAuth allowedRoles={["user", "admin"]}>
            <MovieDetail />
          </RequireAuth>
        }
      />

      <Route
        path="/Series"
        element={
          <RequireAuth allowedRoles={["user", "admin"]}>
            <Series />
          </RequireAuth>
        }
      />

      <Route
        path="/Series/:id"
        element={
          <RequireAuth allowedRoles={["user", "admin"]}>
            <Serie />
          </RequireAuth>
        }
      />

      <Route
        path="/MyList/:id"
        element={
          <RequireAuth allowedRoles={["user", "admin"]}>
            <MyList />
          </RequireAuth>
        }
      />

      <Route
        path="/Contact"
        element={
          <RequireAuth allowedRoles={["user", "admin"]}>
            <Contact />
          </RequireAuth>
        }
      />

      <Route
        path="/Dashboard"
        element={
          <RequireAuth allowedRoles={["user", "admin"]}>
            <Dashboard />
          </RequireAuth>
        }
      />

      </Route>

      {/* 404 fallback */}
      <Route path="*" element={<ProfilePage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
