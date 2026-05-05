<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-NLNXL6X0GX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-NLNXL6X0GX');
</script>















import { Link } from "wouter";
import { LegalLayout } from "@/components/legal-layout";

export default function TermsPage() {
  return (
    <LegalLayout title="Terms &amp; Conditions" lastUpdated="April 30, 2026">
      <section aria-labelledby="acceptance-heading">
        <h2 id="acceptance-heading" className="font-mono font-bold text-xl mb-3">1. Acceptance of Terms</h2>
        <p>
          By accessing or using Waste Tracker (&ldquo;the Service&rdquo;), you agree to be bound
          by these Terms &amp; Conditions. If you do not agree with any part of these terms,
          please discontinue use of the Service immediately.
        </p>
      </section>

      <section aria-labelledby="nature-heading">
        <h2 id="nature-heading" className="font-mono font-bold text-xl mb-3">2. Nature of the Service</h2>
        <p className="mb-3">
          Waste Tracker is a student-built educational project created by Josh Morden as part of
          the Digital Product Management course at the University of Iowa. It is intended to
          demonstrate a functional digital product for tracking food waste in a restaurant kitchen
          environment.
        </p>
        <p>
          The Service is provided for educational and demonstration purposes. It is not a
          commercial product, and no warranties of fitness for any particular commercial purpose
          are made.
        </p>
      </section>

      <section aria-labelledby="permitted-heading">
        <h2 id="permitted-heading" className="font-mono font-bold text-xl mb-3">3. Permitted Use</h2>
        <p className="mb-3">You may use the Service to:</p>
        <ul className="list-disc list-outside pl-5 space-y-2 text-sm">
          <li>Log food waste events by station and reason during kitchen service</li>
          <li>Review waste history and analytics for your kitchen</li>
          <li>Evaluate the application for educational or demonstration purposes</li>
        </ul>
        <p className="mt-4">You must not use the Service to:</p>
        <ul className="list-disc list-outside pl-5 space-y-2 text-sm mt-2">
          <li>Input personally identifiable information about individuals</li>
          <li>Engage in any activity that violates applicable law</li>
          <li>Attempt to reverse-engineer, disrupt, or exploit the Service</li>
          <li>Use the Service in a production-critical environment without accepting the limitations described in Section 4</li>
        </ul>
      </section>

      <section aria-labelledby="no-warranty-heading">
        <h2 id="no-warranty-heading" className="font-mono font-bold text-xl mb-3">4. No Warranties</h2>
        <p>
          The Service is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without
          warranties of any kind, either express or implied. This includes, but is not limited
          to, implied warranties of merchantability, fitness for a particular purpose, and
          non-infringement. We do not warrant that the Service will be uninterrupted, error-free,
          or free of viruses or other harmful components.
        </p>
      </section>

      <section aria-labelledby="liability-heading">
        <h2 id="liability-heading" className="font-mono font-bold text-xl mb-3">5. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by applicable law, Josh Morden and the University of
          Iowa shall not be liable for any indirect, incidental, special, consequential, or
          punitive damages arising from your use of or inability to use the Service, even if
          advised of the possibility of such damages. In no event shall total liability exceed
          the amount paid by you (if any) to access the Service.
        </p>
      </section>

      <section aria-labelledby="data-heading">
        <h2 id="data-heading" className="font-mono font-bold text-xl mb-3">6. Data and Privacy</h2>
        <p>
          Your use of the Service is also governed by our{" "}
          <Link
            href="/privacy-policy"
            className="underline underline-offset-4 font-semibold hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm"
          >
            Privacy Policy
          </Link>
          , which is incorporated into these Terms by reference. We do not collect personally
          identifiable information. See the Privacy Policy for full details.
        </p>
      </section>

      <section aria-labelledby="ip-heading">
        <h2 id="ip-heading" className="font-mono font-bold text-xl mb-3">7. Intellectual Property</h2>
        <p>
          All code, design, and content comprising the Service were created by Josh Morden as
          part of coursework at the University of Iowa. Unauthorized reproduction or distribution
          without prior written consent is prohibited.
        </p>
      </section>

      <section aria-labelledby="governing-heading">
        <h2 id="governing-heading" className="font-mono font-bold text-xl mb-3">8. Governing Law</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws of the State of
          Iowa, United States, without regard to its conflict of law provisions.
        </p>
      </section>

      <section aria-labelledby="changes-heading">
        <h2 id="changes-heading" className="font-mono font-bold text-xl mb-3">9. Changes to These Terms</h2>
        <p>
          We reserve the right to update these Terms &amp; Conditions at any time. Changes are
          effective upon posting to this page, as reflected in the &ldquo;Last updated&rdquo;
          date. Continued use of the Service after changes are posted constitutes your acceptance
          of the revised Terms.
        </p>
      </section>

      <section aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="font-mono font-bold text-xl mb-3">10. Contact</h2>
        <p className="text-sm">
          If you have questions about these Terms &amp; Conditions, please contact:
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
