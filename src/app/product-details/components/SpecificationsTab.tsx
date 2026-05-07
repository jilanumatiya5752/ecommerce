import React from 'react';

interface SpecificationsTabProps {
  specifications: Record<string, string>;
}

export default function SpecificationsTab({ specifications }: SpecificationsTabProps) {
  const entries = Object.entries(specifications);

  return (
    <div className="glass-card border border-border rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <tbody>
          {entries.map(([key, value], idx) => (
            <tr
              key={key}
              className={`border-b border-border last:border-0 ${
                idx % 2 === 0 ? 'bg-muted/30' : 'bg-transparent'
              }`}
            >
              <td className="px-5 py-3.5 font-semibold text-foreground w-2/5 align-top">
                {key}
              </td>
              <td className="px-5 py-3.5 text-muted-foreground">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}