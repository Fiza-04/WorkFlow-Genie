const TextArea = ({ value, onChange }) => {
  return (
    <div className="pt-2">
      <label
        for="message"
        className="block mb-2 font-medium text-neutral-900 dark:text-white"
      >
        Tell me more!
      </label>
      <textarea
        id="message"
        value={value}
        onChange={onChange}
        rows="4"
        className="block p-2.5 w-full text-sm bg-neutral-900 border rounded-[15px]"
        placeholder="Description . . ."
      ></textarea>
    </div>
  );
};

export default TextArea;
