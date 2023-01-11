const AllActivities = ({ activities }) => {

  return (
    <div className="activities">

      {!activities
        ? <h2>There are no activities!</h2>
        : activities.map((activity) => {
          return (
            <div className="single-activity">
              <div className="activity-name">
                {activity.name}
              </div>
              <div className="activity-description">
                {activity.description}
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

export default AllActivities;
