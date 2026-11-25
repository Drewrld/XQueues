import React, { useState } from 'react';

const ExcuseForm = () => {
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    gradeOrCourse: '',
    recipientName: '',
    recipientTitle: 'Instructor / Professor',
    schoolName: '',
    dateSubmitted: today,
    absenceStartDate: today,
    absenceEndDate: today,
    isSingleDay: true,
    reasonCategory: 'Medical / Illness',
    reasonDetails: '',
    guardianName: '',
    contactInfo: '',
    hasAttachment: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', options);
  };

  const generateLetterText = () => {
    const dateRange =
      formData.isSingleDay || formData.absenceStartDate === formData.absenceEndDate
        ? `on ${formatDate(formData.absenceStartDate)}`
        : `from ${formatDate(formData.absenceStartDate)} to ${formatDate(formData.absenceEndDate)}`;

    return `${formatDate(formData.dateSubmitted)}

${formData.recipientName || 'To Whom It May Concern'}
${formData.recipientTitle}
${formData.schoolName}

Dear ${formData.recipientName || 'Sir/Madam'},

Please accept this letter as formal notification that ${formData.studentName || '[Student Name]'}${
      formData.studentId ? ` (ID: ${formData.studentId})` : ''
    }${formData.gradeOrCourse ? `, enrolled in ${formData.gradeOrCourse},` : ''} was unable to attend class ${dateRange} due to ${formData.reasonCategory.toLowerCase()}.

${formData.reasonDetails ? `Specifically, ${formData.reasonDetails.trim()}\n\n` : ''}${
      formData.hasAttachment
        ? 'Supporting documentation (such as a medical certificate or official notice) is attached to this letter for your reference.\n\n'
        : ''
    }I kindly ask that this absence be excused and request guidance on making up any missed coursework, quizzes, or assignments.

Thank you for your time and understanding.

Sincerely,

${formData.guardianName ? `${formData.guardianName}\nParent / Guardian of ${formData.studentName}` : formData.studentName || '[Signature]'}
${formData.contactInfo ? `Contact: ${formData.contactInfo}` : ''}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateLetterText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center print:hidden">
          <h1 className="text-3xl font-bold text-slate-900">Student Excuse Letter Generator</h1>
          <p className="mt-2 text-slate-600">
            Fill out the details below to generate a formatted excuse letter ready for printing or submission.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-5 print:hidden"
          >
            <h2 className="text-lg font-semibold text-slate-800 border-b pb-2">Student & School Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Student Full Name *</label>
                <input
                  type="text"
                  name="studentName"
                  required
                  value={formData.studentName}
                  onChange={handleChange}
                  placeholder="e.g., Juan Dela Cruz"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Student ID (Optional)</label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="e.g., 2026-00142"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Grade / Section / Course *</label>
                <input
                  type="text"
                  name="gradeOrCourse"
                  required
                  value={formData.gradeOrCourse}
                  onChange={handleChange}
                  placeholder="e.g., BSCS 3-A / Grade 11"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">School / University Name *</label>
                <input
                  type="text"
                  name="schoolName"
                  required
                  value={formData.schoolName}
                  onChange={handleChange}
                  placeholder="e.g., State University"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Recipient Name</label>
                <input
                  type="text"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                  placeholder="e.g., Prof. Maria Santos"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Recipient Title</label>
                <input
                  type="text"
                  name="recipientTitle"
                  value={formData.recipientTitle}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <h2 className="text-lg font-semibold text-slate-800 border-b pb-2 pt-2">Absence Details</h2>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isSingleDay"
                name="isSingleDay"
                checked={formData.isSingleDay}
                onChange={handleChange}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="isSingleDay" className="text-sm text-slate-700">
                Single-day absence only
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {formData.isSingleDay ? 'Date of Absence *' : 'Start Date *'}
                </label>
                <input
                  type="date"
                  name="absenceStartDate"
                  required
                  value={formData.absenceStartDate}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {!formData.isSingleDay && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">End Date *</label>
                  <input
                    type="date"
                    name="absenceEndDate"
                    required
                    min={formData.absenceStartDate}
                    value={formData.absenceEndDate}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Reason for Absence *</label>
              <select
                name="reasonCategory"
                value={formData.reasonCategory}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Medical / Illness">Medical / Illness</option>
                <option value="Family Emergency">Family Emergency</option>
                <option value="Dental / Medical Appointment">Dental / Medical Appointment</option>
                <option value="Bereavement">Bereavement</option>
                <option value="Official School / Religious Event">Official School / Religious Event</option>
                <option value="Personal / Other">Personal / Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Brief Explanation *</label>
              <textarea
                name="reasonDetails"
                required
                rows="3"
                value={formData.reasonDetails}
                onChange={handleChange}
                placeholder="e.g., I experienced a high fever and was advised by a physician to rest at home."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="hasAttachment"
                name="hasAttachment"
                checked={formData.hasAttachment}
                onChange={handleChange}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="hasAttachment" className="text-sm text-slate-700">
                Include note about attached supporting document (e.g., medical certificate)
              </label>
            </div>

            <h2 className="text-lg font-semibold text-slate-800 border-b pb-2 pt-2">Sign-off & Contact</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Parent/Guardian Name (If minor)
                </label>
                <input
                  type="text"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleChange}
                  placeholder="Leave blank if self-signing"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone or Email *</label>
                <input
                  type="text"
                  name="contactInfo"
                  required
                  value={formData.contactInfo}
                  onChange={handleChange}
                  placeholder="e.g., 0917-123-4567"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition shadow-sm"
            >
              Finalize Letter
            </button>
          </form>

          {/* Live Letter Preview Section */}
          <div className="flex flex-col">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 flex-grow print:shadow-none print:border-none print:p-0">
              <div className="flex items-center justify-between border-b pb-3 mb-6 print:hidden">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Live Letter Preview
                </span>
                {submitted && (
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full font-medium">
                    Ready to Submit
                  </span>
                )}
              </div>

              <pre className="whitespace-pre-wrap font-serif text-slate-800 text-sm sm:text-base leading-relaxed">
                {generateLetterText()}
              </pre>
            </div>

            <div className="mt-4 flex gap-3 print:hidden">
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition"
              >
                {copied ? 'Copied to Clipboard!' : 'Copy Letter Text'}
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="flex-1 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-sm font-medium py-2.5 px-4 rounded-lg transition"
              >
                Print / Save as PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcuseForm;