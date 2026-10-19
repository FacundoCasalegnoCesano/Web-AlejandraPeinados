import Image from "next/image";
import SiteHeader from "@/components/site-header";
import WorkGallery from "@/components/work-gallery";
import { getWhatsAppUrl, galleryImages, salon, services } from "@/content/salon";

const firstName = salon.name.split(" ")[0] || salon.name;
const appointmentMessage = `Hola, ${firstName}. Quisiera consultar por un turno.`;
const budgetMessage = `Hola, ${firstName}. Quisiera consultar por un servicio.`;
const hasSampleWorks = galleryImages.some((image) => image.sample);
const allSampleWorks = galleryImages.length > 0 && galleryImages.every((image) => image.sample);
const nameLines = salon.name.split(" ");
nameLines.shift();
const nameLine = nameLines.join(" ");
const instagramHandle = salon.instagramUrl.split("/").filter(Boolean).pop() ?? "";

export default function Home() {
  const fullAddress = `${salon.location.street}, ${salon.location.postalCode} ${salon.location.city}, ${salon.location.province}`;

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <SiteHeader />

      <main className="page-shell" id="contenido" tabIndex={-1}>
        <section
          className="hero-section section-wrap"
          id="inicio"
          tabIndex={-1}
          aria-labelledby="page-title"
        >
          <div className="hero-copy">
            <p className="eyebrow">Peluquería · {salon.location.city}, {salon.location.province}</p>
            <h1 className="hero-title" id="page-title">
              <span>{firstName}</span>
              <em>{nameLine}</em>
            </h1>
            <p className="hero-description">
              Conocé los servicios de peluquería y consultá por presupuestos o
              turnos directamente por WhatsApp.
            </p>
            <div className="hero-actions">
              <a
                className="button-primary"
                href={getWhatsAppUrl(appointmentMessage)}
                target="_blank"
                rel="noreferrer"
              >
                Consultar por WhatsApp <span aria-hidden="true">↗</span>
              </a>
              <a className="text-link" href="#servicios">
                Ver servicios <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="hero-address">
              <span className="hero-address-mark" aria-hidden="true" />
              {fullAddress}
            </p>
          </div>

          <div className="hero-visual">
            <figure className="hero-figure">
              <Image
                className="hero-image"
                src={salon.heroImage.src}
                alt={salon.heroImage.alt}
                width={salon.heroImage.width}
                height={salon.heroImage.height}
                sizes="(max-width: 700px) 76vw, (max-width: 900px) 38vw, 416px"
                priority
                unoptimized
              />
              {salon.heroImage.sample && (
                <figcaption className="hero-sample-note">
                  Imagen de muestra · no corresponde a un trabajo de Alejandra.
                </figcaption>
              )}
            </figure>
            <div className="hero-visual-caption" aria-hidden="true">
              <span>{salon.monogram} · {salon.name}</span>
              <span>{salon.location.city}, {salon.location.province}</span>
            </div>
          </div>
        </section>

        <div className="section-wrap intro-strip">
          <span className="intro-mark" aria-hidden="true">
            {salon.monogram}
          </span>
          <p className="intro-copy">
            Cortes, coloración, peinados y servicios de cuidado del cabello. Consultá
            por WhatsApp para conocer los detalles de cada trabajo.
          </p>
        </div>

        <section
          className="services-section"
          id="servicios"
          tabIndex={-1}
          aria-labelledby="services-title"
        >
          <div className="section-wrap">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Servicios</p>
                <h2 className="section-title" id="services-title">
                  Para tu cabello
                </h2>
              </div>
              <p className="section-description">
                Consultá por WhatsApp el servicio que te interesa y su presupuesto.
                Cada trabajo puede variar según lo que estés buscando.
              </p>
            </div>

            <ol className="services-list">
              {services.map((service, index) => (
                <li className="service-item" key={service.id}>
                  <a
                    className="service-link"
                    href={getWhatsAppUrl(
                      `Hola, ${firstName}. Quisiera consultar por ${service.name.toLowerCase()}.`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Consultar por WhatsApp sobre ${service.name}`}
                  >
                    <span className="service-number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="service-name">{service.name}</span>
                    <span className="service-arrow" aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ol>
            <p className="services-note">
              Los precios se consultan por WhatsApp según el trabajo.
            </p>
            <div className="contact-actions">
              <a
                className="text-link"
                href={getWhatsAppUrl(budgetMessage)}
                target="_blank"
                rel="noreferrer"
              >
                Consultar presupuesto <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section
          className="work-section"
          id="trabajos"
          tabIndex={-1}
          aria-labelledby="work-title"
        >
          <div className="section-wrap">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Galería</p>
                <h2 className="section-title" id="work-title">
                  {allSampleWorks
                    ? "Galería de muestra"
                    : hasSampleWorks
                      ? "Galería"
                      : "Trabajos de Alejandra"}
                </h2>
              </div>
              <p className="section-description">
                {hasSampleWorks
                  ? "Las imágenes identificadas como muestra son referencias. Las fotos de trabajos de Alejandra se agregarán cuando estén disponibles."
                  : "Una selección de trabajos de Alejandra."}
              </p>
            </div>

            <WorkGallery images={galleryImages} />
          </div>
        </section>

        <section
          className="contact-section"
          id="contacto"
          tabIndex={-1}
          aria-labelledby="contact-title"
        >
          <div className="section-wrap contact-grid">
            <div>
              <p className="section-kicker">Ubicación y contacto</p>
              <h2 className="contact-title" id="contact-title">
                Tu próxima visita empieza acá.
              </h2>
              <p className="contact-lead">
                Escribile a {firstName} para consultar servicios, presupuestos o
                turnos.
              </p>
              <div className="contact-actions">
                <a
                  className="button-primary"
                  href={getWhatsAppUrl(appointmentMessage)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Consultar por WhatsApp <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <ul className="contact-details">
              <li>
                <span className="contact-label">Dirección</span>
                <address className="contact-value">
                  {fullAddress}
                  <br />
                  Argentina
                </address>
                <a
                  className="contact-value"
                  href={salon.location.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver ubicación en Google Maps ↗
                </a>
              </li>
              <li>
                <span className="contact-label">Instagram</span>
                <a
                  className="contact-value"
                  href={salon.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  @{instagramHandle} ↗
                </a>
              </li>
              <li>
                <span className="contact-label">WhatsApp</span>
                <a
                  className="contact-value"
                  href={getWhatsAppUrl(appointmentMessage)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Consultas y turnos
                </a>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-wrap footer-inner">
          <div className="footer-copy">
            <p>
              © {new Date().getFullYear()} {salon.name} · {salon.location.city}, {salon.location.province}
            </p>
            <p className="footer-credit">Desarrollado por Facundo Casalegno Cesano</p>
          </div>
          <span className="footer-wordmark" aria-hidden="true">
            {salon.monogram}
          </span>
        </div>
      </footer>
    </>
  );
}
