"use client";

interface TestimonialCardProps {
  name: string;
  role: string;
  testimonial: string;
}

function StarIcon() {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.31615 0.566935C9.67932 -0.189022 10.7557 -0.18902 11.1189 0.566936L13.4543 5.42809C13.6 5.73153 13.8887 5.94126 14.2223 5.98613L19.5672 6.70501C20.3984 6.8168 20.731 7.84053 20.1243 8.41953L16.2228 12.1428C15.9792 12.3752 15.8689 12.7145 15.9294 13.0457L16.8973 18.3511C17.0479 19.1762 16.177 19.8089 15.4389 19.4108L10.6922 16.8507C10.3959 16.6909 10.0391 16.6909 9.74283 16.8507L4.99618 19.4108C4.25802 19.8089 3.38719 19.1762 3.53772 18.3511L4.50569 13.0457C4.56611 12.7145 4.45585 12.3752 4.21231 12.1428L0.31074 8.41953C-0.295991 7.84053 0.036641 6.8168 0.867824 6.705L6.21272 5.98613C6.54635 5.94126 6.83502 5.73153 6.9808 5.42809L9.31615 0.566935Z"
        fill="#FE8012"
      />
    </svg>
  );
}

export function TestimonialCard({ name, role, testimonial }: TestimonialCardProps) {
  return (
    <div className="flex flex-col gap-8 bg-foreground px-4 pt-6 pb-8">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col w-1/2">
          <span className="font-semibold text-lg">{name}</span>
          <span className="text-sm">{role}</span>
        </div>
        <div className="flex justify-end items-center w-1/2">
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </div>
      </div>

      <div className="">{testimonial}</div>
    </div>
  );
}
