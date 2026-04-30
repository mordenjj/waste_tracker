import { Link } from "wouter";
import { LegalLayout } from "@/components/legal-layout";

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="April 30, 2026">
      <section aria-labelledby="intro-heading">
        <h2 id="intro-heading" className="font-mono font-bold text-xl mb-3">Overview</h2>
        <p className="mb-3">
          This Privacy Policy explains how Waste Tracker handles information when you use the
          application. We take your privacy seriously and have designed this service to collect
          as little data as possible.
        </p>
        <p>
          Waste Tracker is a student project built by Josh Morden at the University of Iowa as
          part of the Digital Product Management course. This policy is governed by the laws of
          the United States and the State of Iowa.
        </p>
      </section>

      <section aria-labelledby="no-personal-heading">
        <h2 id="no-personal-heading" className="font-mono font-bold text-xl mb-3">Personal Data We Do Not Collect</h2>
        <p className="mb-3">
          Waste Tracker does <strong>not</strong> collect, store, or process any personally
          identifiable information. Specifically, we do not collect:
        </p>
        <ul className="list-disc list-outside pl-5 space-y-2 text-sm">
          <li>Names, email addresses, or contact information</li>
          <li>IP addresses or device identifiers</li>
          <li>Location or GPS data</li>
          <li>Login credentials (no accounts exist)</li>
          <li>Browsing behavior, usage analytics, or session recordings</li>
          <li>Payment information</li>
        </ul>
      </section>

      <section aria-labelledby="data-stored-heading">
        <h2 id="data-stored-heading" className="font-mono font-bold text-xl mb-3">Data Stored by the Application</h2>
        <p className="mb-3">
          When you log a food waste event, the following information is saved to our database:
        </p>
        <ul className="list-disc list-outside pl-5 space-y-2 text-sm">
          <li>
            <strong>Kitchen station</strong> &mdash; one of a fixed set of options (for example:
            Saut&eacute;, Prep, Fry)
          </li>
          <li>
            <strong>Waste reason</strong> &mdash; one of a fixed set of options (for example:
            Burnt food, Dropped, Prep mistake)
          </li>
          <li>
            <strong>Optional note</strong> &mdash; free text entered by the user; we recommend
            not including personal information in this field
          </li>
          <li>
            <strong>Timestamp</strong> &mdash; the date and time the event was logged
          </li>
        </ul>
        <p className="mt-4 text-sm">
          None of the above constitutes personally identifiable information on its own. No
          user accounts or identifiers are associated with these records.
        </p>
      </section>

      <section aria-labelledby="tracking-heading">
        <h2 id="tracking-heading" className="font-mono font-bold text-xl mb-3">Tracking and Analytics</h2>
        <p>
          Waste Tracker does <strong>not</strong> use any analytics platforms, advertising
          networks, social media pixels, or third-party tracking scripts. No data about your
          visit is shared with any third party for any purpose.
        </p>
      </section>

      <section aria-labelledby="browser-storage-heading">
        <h2 id="browser-storage-heading" className="font-mono font-bold text-xl mb-3">Browser Local Storage</h2>
        <p>
          We store one item in your browser&rsquo;s local storage: your cookie consent
          preference. This value is never transmitted to our servers. See our{" "}
          <Link
            href="/cookie-policy"
            className="underline underline-offset-4 font-semibold hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm"
          >
            Cookie Policy
          </Link>{" "}
          for full details.
        </p>
      </section>

      <section aria-labelledby="third-parties-heading">
        <h2 id="third-parties-heading" className="font-mono font-bold text-xl mb-3">Third Parties</h2>
        <p>
          We do not sell, rent, or share any data with third parties. Waste log data is stored
          in a PostgreSQL database hosted on infrastructure we control. No data is disclosed to
          third parties except as required by law.
        </p>
      </section>

      <section aria-labelledby="rights-heading">
        <h2 id="rights-heading" className="font-mono font-bold text-xl mb-3">Your Rights</h2>
        <p className="mb-3">
          Because we do not collect personally identifiable information, most data-subject rights
          (such as those under GDPR or CCPA) are not applicable in their usual form. However, if
          you believe waste log entries you submitted should be removed, please contact us and we
          will make reasonable efforts to accommodate your request.
        </p>
      </section>

      <section aria-labelledby="changes-heading">
        <h2 id="changes-heading" className="font-mono font-bold text-xl mb-3">Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo;
          date at the top of this page reflects when it was most recently revised. Continued use
          of the service after changes are posted constitutes acceptance of the revised policy.
        </p>
      </section>

      <section aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="font-mono font-bold text-xl mb-3">Contact</h2>
        <p className="text-sm">
          Questions or concerns about this Privacy Policy? Please reach out:
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
