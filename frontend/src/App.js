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
import TVSerieManager from './admin/seriesManage/ManageEpisodes';
import ViewSeries from './admin/seriesManage/ViewSeries';
import UpdateSerie from './admin/seriesManage/UpdateSerie';
import ManageSeasons from './admin/seriesManage/seasonManage/ManageSeasons';
import CreateSeason from './admin/seriesManage/seasonManage/CreateSeason';
import UpdateSeason from './admin/seriesManage/seasonManage/UpdateSeason';


function AppLayout() {
  const location = useLocation();
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
        <Route path="/AdminPanel" element={<AdminPanel />} />
        {/* CRUD Movie */}
        <Route path="/MoviesManager" element={<MovieManager />} />
        <Route path="/create-movie" element={<CreateFilm />} />
        <Route path="/update-movie/:id" element={<UpdateFilm />} />
        {/* CRUD Series*/}
        <Route path="/SeriesManager" element={<SeriesManager />} />
        <Route path="/view-series/:id" element={<ViewSeries />} />
        <Route path="/update-series/:id" element={<UpdateSerie />} />

        {/* CRUD Seasons*/}
        <Route path="/manage-seasons" element={<ManageSeasons />} />
        <Route path="/create-season" element={<CreateSeason />} />
        <Route path="/update-season/:id" element={<UpdateSeason />} />

        <Route path="/Hub" element={<Hub />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/watch/movie" element={<Video mode="movie" />} />
        <Route path="/watch/episode" element={<Video mode="episode" />} />
 
        
        <Route path="/Movies" element={<Movies />} />
        <Route path="/Movies/:id" element={<MovieDetail />} />
        
        <Route path="/Series" element={<Series />} />
        <Route path="/Series/:id" element={<Serie />} />
        <Route path="/MyList/:id" element={<MyList />} />
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
