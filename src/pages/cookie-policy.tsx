
import { LegalLayout } from "@/components/legal-layout";

export default function CookiePolicyPage() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="April 30, 2026">
      <section aria-labelledby="intro-heading">
        <h2 id="intro-heading" className="font-mono font-bold text-xl mb-3">Overview</h2>
        <p className="mb-3">
          This Cookie Policy explains how Waste Tracker uses browser storage on your device. We
          are committed to being transparent about how we handle your preferences.
        </p>
        <p>
          Waste Tracker does <strong>not</strong> use traditional HTTP cookies. Instead, we use
          your browser&rsquo;s <strong>local storage</strong> to save a single functional
          preference. Local storage works similarly to cookies in that it stores data on your
          device, but data stored in local storage is never sent to our servers automatically.
        </p>
      </section>

      <section aria-labelledby="what-we-store-heading">
        <h2 id="what-we-store-heading" className="font-mono font-bold text-xl mb-3">What We Store</h2>
        <p className="mb-4">
          We store exactly one item in your browser&rsquo;s local storage:
        </p>
        <div className="border-2 border-border rounded-md p-4 bg-secondary/30">
          <dl>
            <dt className="font-mono font-bold text-sm mb-1">
              <code>waste_tracker_cookie_consent</code>
            </dt>
            <dd className="text-sm leading-relaxed pl-4 border-l-2 border-border">
              <strong>Purpose:</strong> Remembers that you have acknowledged and accepted this
              cookie policy, so the consent banner is not shown on every visit.
              <br />
              <strong>Duration:</strong> Stored until you clear your browser&rsquo;s local storage
              or use the reset option below.
              <br />
              <strong>Sent to servers:</strong> No &mdash; this value stays on your device only.
            </dd>
          </dl>
        </div>
      </section>

      <section aria-labelledby="no-tracking-heading">
        <h2 id="no-tracking-heading" className="font-mono font-bold text-xl mb-3">What We Do Not Use</h2>
        <p className="mb-3">Waste Tracker does <strong>not</strong> use any of the following:</p>
        <ul className="list-disc list-outside pl-5 space-y-2 text-sm">
          <li>Advertising or marketing cookies</li>
          <li>Analytics cookies or third-party analytics services (such as Google Analytics)</li>
          <li>Social media tracking pixels or scripts</li>
          <li>Session cookies (no login or account system exists)</li>
          <li>Any cookies or scripts set by third parties</li>
        </ul>
      </section>

      <section aria-labelledby="manage-heading">
        <h2 id="manage-heading" className="font-mono font-bold text-xl mb-3">Managing Your Preferences</h2>
        <p className="mb-3">
          You can withdraw your consent or reset the banner at any time by clearing your
          browser&rsquo;s local storage for this site. Steps vary by browser:
        </p>
        <ul className="list-disc list-outside pl-5 space-y-2 text-sm">
          <li>
            <strong>Chrome:</strong> Open DevTools (F12) &rarr; Application &rarr; Local Storage
            &rarr; right-click the site entry and choose &ldquo;Clear.&rdquo;
          </li>
          <li>
            <strong>Firefox:</strong> Open DevTools (F12) &rarr; Storage &rarr; Local Storage
            &rarr; delete the <code>waste_tracker_cookie_consent</code> entry.
          </li>
          <li>
            <strong>Safari:</strong> Preferences &rarr; Privacy &rarr; Manage Website Data
            &rarr; find this site and remove its data.
          </li>
        </ul>
        <p className="mt-4 text-sm">
          Clearing local storage will cause the consent banner to reappear on your next visit.
          It will not affect any waste log data stored on our servers.
        </p>
      </section>

      <section aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="font-mono font-bold text-xl mb-3">Contact</h2>
        <p className="text-sm">
          If you have questions about this Cookie Policy, please contact:
        </p>
        <address className="not-italic mt-2 text-sm">
          <strong>Josh Morden</strong><br />
          University of Iowa &mdash; Digital Product Management<br />
          <a
            href="mailto:morden.j.josh@gmail.com"
            className="underline underline-offset-4 hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm"
          >
            morden.j.josh@gmail.com
          </a>
        </address>
      </section>
    </LegalLayout>
  );
}
