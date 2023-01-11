import { Routes, Route, Navigate } from 'react-router-dom'
import ActivitiesNavBar from "./ActivitiesNavBar";
import AllActivities from './AllActivities';
import NewActivity from './NewActivity';
import NotFound from '../NotFound';

const Activities = ({ token, activities }) => {

  return (
    <>
      <ActivitiesNavBar />
      <Routes>
        <Route exact path="/" element={<AllActivities activities={activities} />} />
        <Route exact path="/new" element={<NewActivity activities={activities} token={token} />} />
        <Route
          element={<NotFound />}
          path="/*"
        />
      </Routes>
    </>
  );
}

export default Activities;
