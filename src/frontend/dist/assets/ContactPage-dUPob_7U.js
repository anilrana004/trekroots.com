import { r as reactExports, j as jsxRuntimeExports, P as Phone, g as Mail, f as MessageCircle, b as MapPin } from "./index-B8T7PWVC.js";
const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 99999 99999",
    href: "tel:+919999999999"
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@manyadestination.com",
    href: "mailto:hello@manyadestination.com"
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with an Expert",
    href: "https://wa.me/919999999999?text=Hi%20Manya%20Destination!%20I%20am%20interested%20in%20planning%20a%20Himalayan%20journey."
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Rajpur Road, Dehradun, Uttarakhand 248001",
    href: "https://maps.google.com/?q=Dehradun,Uttarakhand"
  }
];
function ContactPage() {
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: ""
  });
  const [submitted, setSubmitted] = reactExports.useState(false);
  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-sidebar py-14 px-4 border-b border-sidebar-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-3xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl font-bold italic text-sidebar-foreground mb-3", children: "Plan Your Himalayan Journey" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sidebar-foreground/75 font-body text-lg", children: "Our expert team is ready to craft the perfect Himalayan experience for you." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-12 max-w-5xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground mb-2", children: "Get in Touch" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-relaxed", children: "Whether you're planning your first trek or your tenth yatra — we'll help you make it extraordinary." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: CONTACT_INFO.map(({ icon: Icon, label, value, href }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-start gap-3 p-3 rounded-lg bg-card border border-border hover:border-primary/40 hover:bg-primary/5 transition-smooth group",
            "data-ocid": `contact.${label.toLowerCase()}_link`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground font-body truncate", children: value })
              ] })
            ]
          },
          label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/50 rounded-lg p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Office hours:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Monday – Saturday, 9:00 AM – 7:00 PM IST",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "WhatsApp available 7 days a week"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3", children: submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "contact.success_state",
          className: "flex flex-col items-center justify-center h-full py-12 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: "🏔️" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-semibold text-foreground mb-2", children: "We'll be in touch!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm max-w-sm", children: "Thank you for reaching out. Our team will contact you within 24 hours to plan your perfect Himalayan journey." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubmit,
          className: "bg-card rounded-xl border border-border p-6 space-y-5",
          "data-ocid": "contact.form",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: "Send Us a Message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "name",
                    className: "block text-xs font-medium text-muted-foreground font-body mb-1.5",
                    children: "Full Name *"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "name",
                    name: "name",
                    type: "text",
                    required: true,
                    value: form.name,
                    onChange: handleChange,
                    placeholder: "Rahul Sharma",
                    "data-ocid": "contact.name_input",
                    className: "w-full px-3 py-2 text-sm border border-input rounded-md bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "email",
                    className: "block text-xs font-medium text-muted-foreground font-body mb-1.5",
                    children: "Email Address *"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "email",
                    name: "email",
                    type: "email",
                    required: true,
                    value: form.email,
                    onChange: handleChange,
                    placeholder: "rahul@example.com",
                    "data-ocid": "contact.email_input",
                    className: "w-full px-3 py-2 text-sm border border-input rounded-md bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "phone",
                    className: "block text-xs font-medium text-muted-foreground font-body mb-1.5",
                    children: "Phone Number"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "phone",
                    name: "phone",
                    type: "tel",
                    value: form.phone,
                    onChange: handleChange,
                    placeholder: "+91 98765 43210",
                    "data-ocid": "contact.phone_input",
                    className: "w-full px-3 py-2 text-sm border border-input rounded-md bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "interest",
                    className: "block text-xs font-medium text-muted-foreground font-body mb-1.5",
                    children: "I'm Interested In"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    id: "interest",
                    name: "interest",
                    value: form.interest,
                    onChange: handleChange,
                    "data-ocid": "contact.interest_select",
                    className: "w-full px-3 py-2 text-sm border border-input rounded-md bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select an option" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "trek", children: "A Trek" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "yatra", children: "A Yatra / Pilgrimage" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "package", children: "A Holiday Package" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "stay", children: "Accommodation Only" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "custom", children: "Custom / Group Trip" })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "message",
                  className: "block text-xs font-medium text-muted-foreground font-body mb-1.5",
                  children: "Tell Us More *"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  id: "message",
                  name: "message",
                  required: true,
                  rows: 4,
                  value: form.message,
                  onChange: handleChange,
                  placeholder: "How many people? Preferred dates? Any specific preferences or requirements?",
                  "data-ocid": "contact.message_textarea",
                  className: "w-full px-3 py-2 text-sm border border-input rounded-md bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                "data-ocid": "contact.submit_button",
                className: "w-full py-3 px-4 rounded-md font-semibold font-body text-sm text-primary-foreground bg-primary hover:bg-primary/90 transition-colors",
                children: "Send Message"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body text-center", children: "Typically replies within 24 hours · Payments secured by Razorpay" })
          ]
        }
      ) })
    ] }) })
  ] });
}
export {
  ContactPage as default
};
