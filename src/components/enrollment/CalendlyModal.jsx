import { X, Calendar, Clock, Video, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../Button';

const timeSlots = [
  { id: 1, time: '9:00 AM', available: true },
  { id: 2, time: '10:00 AM', available: true },
  { id: 3, time: '11:00 AM', available: false },
  { id: 4, time: '1:00 PM', available: true },
  { id: 5, time: '2:00 PM', available: true },
  { id: 6, time: '3:00 PM', available: true },
];

const days = [
  { date: 'Mon, Mar 25', slots: timeSlots },
  { date: 'Tue, Mar 26', slots: timeSlots },
  { date: 'Wed, Mar 27', slots: timeSlots },
  { date: 'Thu, Mar 28', slots: timeSlots },
  { date: 'Fri, Mar 29', slots: timeSlots },
];

export default function CalendlyModal({ isOpen, onClose, onSchedule }) {
  const [selectedDay, setSelectedDay] = useState(days[0]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);

  if (!isOpen) return null;

  const handleScheduleClick = () => {
    if (selectedDay && selectedTime) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmSchedule = () => {
    setIsScheduled(true);
    onSchedule({ day: selectedDay.date, time: selectedTime.time });
  };

  const renderConfirmation = () => (
    <div className="p-4 sm:p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center">
          <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Confirm Your Appointment</h2>
          <p className="text-xs sm:text-sm text-gray-500">Please review the details below</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
        <dl className="space-y-4">
          <div>
            <dt className="text-sm text-gray-500">Date</dt>
            <dd className="text-sm sm:text-base font-medium text-gray-900">{selectedDay.date}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Time</dt>
            <dd className="text-sm sm:text-base font-medium text-gray-900">{selectedTime.time}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Meeting Type</dt>
            <dd className="text-sm sm:text-base font-medium text-gray-900">Virtual Benefits Consultation</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Duration</dt>
            <dd className="text-sm sm:text-base font-medium text-gray-900">30 minutes</dd>
          </div>
        </dl>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="secondary" size="sm" onClick={() => setShowConfirmation(false)}>
          Back
        </Button>
        <Button variant="primary" size="sm" onClick={handleConfirmSchedule}>
          Confirm Schedule
        </Button>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="p-4 sm:p-6 text-center">
      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
      </div>
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Meeting Scheduled!</h2>
      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
        Your benefits consultation has been scheduled for {selectedDay.date} at {selectedTime.time}
      </p>
      <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 text-left">
        <h3 className="font-medium text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">What happens next?</h3>
        <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
          <li>• You'll receive a calendar invitation via email</li>
          <li>• A video conference link will be included in the invitation</li>
          <li>• Your advisor will review your information before the meeting</li>
        </ul>
      </div>
      <Button variant="primary" size="md" onClick={onClose}>
        Done
      </Button>
    </div>
  );

  if (isScheduled) {
    return (
      <div className="fixed inset-0 overflow-y-auto bg-gray-500 bg-opacity-75" style={{ zIndex: 9999 }}>
        <div className="flex min-h-screen items-center justify-center p-2 sm:p-4">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto m-2">
            {renderSuccess()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-y-auto bg-gray-500 bg-opacity-75" style={{ zIndex: 9999 }}>
      <div className="flex min-h-screen items-center justify-center p-2 sm:p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-auto m-2">
          <div className="absolute right-3 sm:right-4 top-3 sm:top-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          <div className="p-4 sm:p-6">
            {showConfirmation ? (
              renderConfirmation()
            ) : (
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Schedule a Benefits Consultation</h2>
                    <p className="text-xs sm:text-sm text-gray-500">30 min | Virtual meeting</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0">
                  <div className="sm:w-1/2 sm:border-r sm:border-gray-200 sm:pr-8">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-2 sm:mb-4">Select a Date</h3>
                    <div className="space-y-1 sm:space-y-2">
                      {days.map((day) => (
                        <button
                          key={day.date}
                          onClick={() => setSelectedDay(day)}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-left rounded-lg transition-colors text-sm ${
                            selectedDay.date === day.date
                              ? 'bg-purple-50 border-2 border-purple-200'
                              : 'hover:bg-gray-50 border-2 border-transparent'
                          }`}
                        >
                          <span className="font-medium text-gray-900">{day.date}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="sm:w-1/2">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-2 sm:mb-4">Select a Time</h3>
                    <div className="grid grid-cols-2 gap-1 sm:gap-2">
                      {selectedDay.slots.map((slot) => (
                        <button
                          key={slot.id}
                          disabled={!slot.available}
                          onClick={() => setSelectedTime(slot)}
                          className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-center transition-colors text-sm ${
                            !slot.available
                              ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                              : selectedTime?.id === slot.id
                              ? 'bg-purple-50 border-2 border-purple-200'
                              : 'hover:bg-gray-50 border-2 border-transparent'
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                  <div className="rounded-lg bg-gray-50 p-3 sm:p-4 mb-4 sm:mb-6">
                    <div className="flex items-center space-x-3">
                      <Video className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <div className="text-xs sm:text-sm text-gray-600">
                        <p className="font-medium text-xs sm:text-sm">Virtual Meeting</p>
                        <p className="text-xs sm:text-sm">A video conference link will be sent after scheduling</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleScheduleClick}
                      disabled={!selectedDay || !selectedTime}
                      className="px-4 sm:px-6 py-2 bg-purple-600 text-white rounded-lg font-medium text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
                    >
                      Schedule Meeting
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}