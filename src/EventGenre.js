import React, { useEffect, useState } from "react";
import { PieChart, Pie, ResponsiveContainer, Cell, Legend } from "recharts";

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(() => getData());
  }, [events]);

  const getData = () => {
    const genres = [
      "React",
      "JavaScript",
      "JavaScript!!",
      "Node",
      "Node.js",
      "jQuery",
      "jQuery,",
      "AngularJS",
      "Angular",
      "AngularJS-Remote",
    ];

    const data = genres.map((genre) => {
      const value = events.filter((event) =>
        event.summary.split(" ").includes(genre)
      ).length;
      return { name: genre, value };
    });
    return data;
  };

  const colors = [
    "#632d91",
    "#108732",
    "#2dc41a",
    "#c48a25",
    "#f0df26",
    "#e03a99",
    "#b51470",
    "#337ef5",
    "#12306e",
    "#7d0f23",
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          labelLine={false}
          paddingAngle={8}
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          innerRadius={65}
          outerRadius={100}
          fill="red"
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
              name={entry.name}
            />
          ))}
        </Pie>
        <Legend
          verticalAlign="bottom"
          align="center"
          iconType="line"
          />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenre;