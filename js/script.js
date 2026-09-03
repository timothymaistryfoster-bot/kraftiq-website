// Smooth-scroll nav highlighting + tiny UX polish (no external deps)
document.addEventListener('DOMContentLoaded', () => {
  // Auto-close other open FAQ items for a tidier accordion feel
  const faqItems = document.querySelectorAll('.faq-list details');
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach((other) => {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  initKlaviyoSignupForm();
});

/**
 * Klaviyo email capture, wired to Klaviyo's public "Client Subscribe Profiles" API.
 * Fill in KLAVIYO_PUBLIC_API_KEY and KLAVIYO_LIST_ID below (found in your Klaviyo
 * dashboard under Settings → API Keys, and Lists & Segments respectively). No backend
 * required — this posts directly from the browser using your public key.
 */
function initKlaviyoSignupForm() {
  const KLAVIYO_PUBLIC_API_KEY = 'YOUR_PUBLIC_API_KEY';
  const KLAVIYO_LIST_ID = 'YOUR_LIST_ID';

  const form = document.getElementById('klaviyo-signup-form');
  const status = document.getElementById('klaviyo-signup-status');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = form.querySelector('input[name="email"]').value.trim();
    if (!email) return;

    if (KLAVIYO_PUBLIC_API_KEY === 'YOUR_PUBLIC_API_KEY' || KLAVIYO_LIST_ID === 'YOUR_LIST_ID') {
      status.textContent = 'Signup form not yet connected — add your Klaviyo keys in js/script.js.';
      status.className = 'newsletter-status error';
      return;
    }

    status.textContent = 'Subscribing…';
    status.className = 'newsletter-status';

    try {
      const response = await fetch(
        `https://a.klaviyo.com/client/subscriptions/?company_id=${KLAVIYO_PUBLIC_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            revision: '2024-10-15',
          },
          body: JSON.stringify({
            data: {
              type: 'subscription',
              attributes: {
                profile: {
                  data: {
                    type: 'profile',
                    attributes: { email },
                  },
                },
              },
              relationships: {
                list: { data: { type: 'list', id: KLAVIYO_LIST_ID } },
              },
            },
          }),
        }
      );

      if (response.ok || response.status === 202) {
        status.textContent = "You're in! Check your inbox for your 15% code.";
        status.className = 'newsletter-status success';
        form.reset();
      } else {
        status.textContent = 'Something went wrong — please try again.';
        status.className = 'newsletter-status error';
      }
    } catch (err) {
      status.textContent = 'Network error — please try again.';
      status.className = 'newsletter-status error';
    }
  });
}
