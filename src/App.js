import { ToastContainer, toast } from 'react-toastify';
import { Home, Login, Public, Personal, Album, WeekRank, ZingChart, Search, SearchSongs, SearchAll, Singer, SearchPlaylist, Follow } from './containers/public/'
import { Route, Routes } from 'react-router-dom';
import path from './ultis/path';
import { useEffect, useState } from 'react';
import * as actions from './store/actions';
import { useDispatch } from 'react-redux';
import { apiGetChartHome } from './apis';

function App() {
  const dispatch = useDispatch()
  const [weekChart, setWeekChart] = useState(null)
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth)
  useEffect(() => {
    dispatch(actions.getHome())
    const fetchChartData = async () => {
      const response = await apiGetChartHome()
      if (response.data.err === 0) {
        setWeekChart(response.data.data.weekChart)
      }
    }
    fetchChartData()
  }, [])

  //Hàm định nghĩa khi resize
  const setWidth = (e) => {
    setCurrentWidth(e.target.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', setWidth)
    return () => {
      window.removeEventListener('resize', setWidth)
    }
  }, [])

  useEffect(() => {
    dispatch(actions.setCurrentWidth(currentWidth))
  }, [currentWidth])
  return (
    <>
      <div>
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.LOGIN} element={<Login />} />
            <Route path={path.MY_MUSIC} element={<Personal />} />
            <Route path={path.MY_FOLLOW} element={<Follow />} />
            <Route path={path.ALBUM__TITLE__PID} element={<Album />} />
            <Route path={path.PLAYLIST__TITLE__PID} element={<Album />} />
            <Route path={path.WEEKRANK__TITLE__PID} element={<WeekRank weekChart={weekChart && Object.values(weekChart)} />} />
            <Route path={path.ZING_CHART} element={<ZingChart />} />
            <Route path={path.HOME__SINGER} element={<Singer />} />
            <Route path={path.HOME_ARTIST__SINGER} element={<Singer />} />
            <Route path={path.SEARCH} element={<Search />}>
              <Route path={path.ALL} element={<SearchAll />} />
              <Route path={path.SONG} element={<SearchSongs />} />
              <Route path={path.PLAYLIST_SEARCH} element={<SearchPlaylist />} />
            </Route>

            <Route path={path.STAR} element={<Home />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
