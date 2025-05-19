import { useState } from "react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";

export default function TeamCalendar() {
  const [currentMonth] = useState("March 2025");

  // Calendar data for the month
  const calendarData = [
    { day: null, date: 23, events: [] },
    { day: null, date: 24, events: [] },
    { day: null, date: 25, events: [] },
    { day: null, date: 26, events: [] },
    { day: null, date: 27, events: [] },
    { day: null, date: 28, events: [] },
    {
      day: "Sun",
      date: 1,
      events: [
        {
          id: 1,
          type: "my-leave",
          title: "On Leave",
          users: ["user1", "user2"],
        },
      ],
    },
    { day: "Mon", date: 2, events: [] },
    { day: "Tue", date: 3, events: [] },
    {
      day: "Wed",
      date: 4,
      events: [{ id: 2, type: "event", title: "Meeting with Chris" }],
    },
    {
      day: "Thu",
      date: 5,
      events: [{ id: 3, type: "team-leave", title: "Lunch at Mom's" }],
    },
    { day: "Fri", date: 6, events: [] },
    { day: "Sat", date: 7, events: [] },
    { day: "Sun", date: 8, events: [] },
    {
      day: "Mon",
      date: 9,
      events: [{ id: 4, type: "event", title: "Financial Advisor Meeting" }],
    },
    {
      day: "Tue",
      date: 10,
      events: [
        { id: 5, type: "event", title: "Weather on Flights" },
        {
          id: 6,
          type: "my-leave",
          title: "On Leave",
          users: ["user1", "user3"],
        },
      ],
    },
    { day: "Wed", date: 11, events: [] },
    {
      day: "Thu",
      date: 12,
      events: [{ id: 7, type: "team-leave", title: "Ashley's Chili Raclette" }],
    },
    { day: "Fri", date: 13, events: [] },
    { day: "Sat", date: 14, events: [] },
    {
      day: "Sun",
      date: 15,
      events: [
        { id: 8, type: "event", title: "In the cabin for hopscotch" },
        { id: 9, type: "team-leave", title: "Go to the store to get screws" },
        { id: 10, type: "event", title: "Dan has SWOT analysis!!!!" },
      ],
    },
    {
      day: "Mon",
      date: 16,
      events: [
        { id: 11, type: "event", title: "Budget for next month" },
        { id: 12, type: "team-leave", title: "Take Julia to dinner" },
      ],
    },
    {
      day: "Tue",
      date: 17,
      events: [
        { id: 13, type: "team-leave", title: "St. Patrick's Day" },
        { id: 14, type: "event", title: "DMV appointment" },
      ],
    },
    { day: "Wed", date: 18, events: [] },
    { day: "Thu", date: 19, events: [] },
    {
      day: "Fri",
      date: 20,
      events: [
        { id: 15, type: "team-leave", title: "Dinner with Kate and Dan" },
      ],
    },
    { day: "Sat", date: 21, events: [] },
    {
      day: "Sun",
      date: 22,
      events: [
        { id: 16, type: "event", title: "Important team meeting" },
        { id: 17, type: "event", title: "Groceries" },
      ],
    },
    { day: "Mon", date: 23, events: [] },
    { day: "Tue", date: 24, events: [] },
    {
      day: "Wed",
      date: 25,
      events: [{ id: 18, type: "team-leave", title: "Flight to Japan" }],
    },
    {
      day: "Thu",
      date: 26,
      events: [
        { id: 19, type: "team-leave", title: "First day spring contest" },
        { id: 20, type: "team-leave", title: "Morning gardening" },
        { id: 21, type: "team-leave", title: "Movie date night" },
      ],
    },
    { day: "Fri", date: 27, events: [] },
    {
      day: "Sat",
      date: 28,
      events: [{ id: 22, type: "event", title: "Meeting on May" }],
    },
    {
      day: "Sun",
      date: 29,
      events: [
        { id: 23, type: "event", title: "Pick up Jerry from the park" },
        { id: 24, type: "event", title: "Basketball contest" },
      ],
    },
    {
      day: "Mon",
      date: 30,
      events: [{ id: 25, type: "my-leave", title: "I am covering now" }],
    },
    { day: "Tue", date: 31, events: [] },
    { day: null, date: 1, events: [] },
    { day: null, date: 2, events: [] },
    { day: null, date: 3, events: [] },
    { day: null, date: 4, events: [] },
    { day: null, date: 5, events: [] },
    { day: null, date: 6, events: [] },
  ];

  const renderEventCard = (event) => {
    let bgColor = "";

    switch (event.type) {
      case "my-leave":
        bgColor = "bg-green-200";
        break;
      case "team-leave":
        bgColor = "bg-green-200";
        break;
      case "event":
        bgColor = "bg-red-200";
        break;
      default:
        bgColor = "bg-gray-200";
    }

    return (
      <div key={event.id} className={`${bgColor} p-1 mb-1 rounded text-xs`}>
        {event.title}
        {event.users && event.users.length > 0 && (
          <div className="flex mt-1">
            {event.users.map((user, idx) => (
              <div
                key={idx}
                className="bg-gray-300 rounded-full h-5 w-5 flex items-center justify-center -ml-1 first:ml-0 border border-white"
              >
                <User size={12} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto bg-white p-4 rounded-lg shadow !h-[940px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{currentMonth}</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="h-3 w-3 rounded-full bg-green-200"></div>
            <span className="text-sm">My Leave</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="h-3 w-3 rounded-full bg-green-200"></div>
            <span className="text-sm">Team Leaves</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="h-3 w-3 rounded-full bg-red-200"></div>
            <span className="text-sm">Events</span>
          </div>
          <div className="flex space-x-2">
            <button className="p-1 rounded hover:bg-gray-100">
              <ChevronLeft size={16} />
            </button>
            <button className="p-1 rounded hover:bg-gray-100">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-sm text-gray-500 font-medium"
          >
            {day}
          </div>
        ))}

        {calendarData.map((day, idx) => (
          <div
            key={idx}
            className={`h-28 p-1 ${
              day.day === null ? "bg-gray-50 text-gray-400" : "bg-white"
            }`}
          >
            <div className="text-xs text-right mb-1">{day.date}</div>
            <div className="overflow-y-auto h-24">
              {day.events.map((event) => renderEventCard(event))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
