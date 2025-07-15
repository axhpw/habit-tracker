import React, { useEffect, useRef } from 'react';
import CalHeatmap from 'cal-heatmap';
import 'cal-heatmap/cal-heatmap.css'; // If you want default styles
import { getSessions } from '../helpers/storage';

export default function Heatmap() {
  const calRef = useRef(null);

  useEffect(() => {
    if (!calRef.current) return;

    const cal = new CalHeatmap();

    // Convert sessions to { timestamp: count }
    const sessions = getSessions(); // default user
    const data = {};
    for (const [date, count] of Object.entries(sessions)) {
      // Convert 'YYYY-MM-DD' to Unix timestamp in SECONDS
      const timestamp = Math.floor(new Date(date).getTime() / 1000);
      data[timestamp] = count;
    }

    cal.paint({
      itemSelector: calRef.current,
      domain: {
        type: 'month',
        label: { position: 'top' }, // or remove this if you want no labels
      },
      subDomain: {
        type: 'day',
      },
      range: 12,
      start: new Date(new Date().setDate(new Date().getDate() - 365)),
      data: {
        source: data,
        type: 'json',
      },
      domainGutter: 2,
      legend: [1, 2, 4, 6],
      tooltip: true,
    });
    return () => cal.destroy();
  }, []);

  return <div ref={calRef} />;
}