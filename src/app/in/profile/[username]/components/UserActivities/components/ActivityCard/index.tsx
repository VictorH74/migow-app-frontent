import React from 'react';
import useActivityCard, { ActivityCardProps } from "./useActivityCard"


export default function ActivityCard(props: ActivityCardProps) {
  const hook = useActivityCard(props);

  return (
    <div>
      ActivityCard component
    </div>
  );
}