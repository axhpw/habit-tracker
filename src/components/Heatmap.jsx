import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { getSessions } from '../helpers/storage';

export default function Heatmap() {
  const sessions = getSessions();
  const values = Object.entries(sessions).map(([date, count]) => ({
    date,
    count,
  }));

  const today = new Date();
  const lastYear = new Date();
  lastYear.setDate(today.getDate() - 365);

  return (
    <div className="w-full max-w-[1000px] min-w-[800px]">
      <CalendarHeatmap
        startDate={lastYear}
        endDate={today}
        values={values}
        showWeekdayLabels={true}
        gutterSize={3}
        classForValue={(value) => {
          if (!value || value.count === 0) return 'color-empty';
          if (value.count >= 6) return 'color-github-4';
          if (value.count >= 4) return 'color-github-3';
          if (value.count >= 2) return 'color-github-2';
          return 'color-github-1';
        }}
        tooltipDataAttrs={(value) => {
          if (!value || !value.date) return null;
          return {
            'data-tooltip-id': 'heatmap-tooltip',
            'data-tooltip-content': `${value.date}: ${value.count} sessions`,
          };
        }}
      />
      <Tooltip id="heatmap-tooltip" />
    </div>
  );
}
