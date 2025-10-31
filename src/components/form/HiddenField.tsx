'use client';

interface HiddenFieldProps {
  name: string;
  value: any;
  onChange: (name: string, value: any) => void;
}

export default function HiddenField({ name, value, onChange }: HiddenFieldProps) {
  return (
    <input
      type="hidden"
      name={name}
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
    />
  );
}