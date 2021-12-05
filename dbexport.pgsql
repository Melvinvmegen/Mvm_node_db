--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-1.pgdg18.04+1)
-- Dumped by pg_dump version 14.1 (Ubuntu 14.1-1.pgdg18.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Costs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Costs" (
    id integer NOT NULL,
    name character varying(255),
    total double precision,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "RevenuId" integer
);


ALTER TABLE public."Costs" OWNER TO postgres;

--
-- Name: Costs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Costs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Costs_id_seq" OWNER TO postgres;

--
-- Name: Costs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Costs_id_seq" OWNED BY public."Costs".id;


--
-- Name: Credits; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Credits" (
    id integer NOT NULL,
    creditor character varying(255),
    reason character varying(255),
    total double precision,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "RevenuId" integer
);


ALTER TABLE public."Credits" OWNER TO postgres;

--
-- Name: Credits_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Credits_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Credits_id_seq" OWNER TO postgres;

--
-- Name: Credits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Credits_id_seq" OWNED BY public."Credits".id;


--
-- Name: Cryptos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cryptos" (
    id integer NOT NULL,
    "buyingDate" timestamp with time zone,
    name character varying(255),
    price double precision,
    "pricePurchase" double precision,
    "quantityPurchase" double precision,
    "priceChange" double precision,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Cryptos" OWNER TO postgres;

--
-- Name: Cryptos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Cryptos_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Cryptos_id_seq" OWNER TO postgres;

--
-- Name: Cryptos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Cryptos_id_seq" OWNED BY public."Cryptos".id;


--
-- Name: Customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Customers" (
    id integer NOT NULL,
    "firstName" character varying(255),
    "lastName" character varying(255),
    company character varying(255),
    email character varying(255),
    phone character varying(255),
    address character varying(255),
    city character varying(255),
    siret character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Customers" OWNER TO postgres;

--
-- Name: Customers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Customers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Customers_id_seq" OWNER TO postgres;

--
-- Name: Customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Customers_id_seq" OWNED BY public."Customers".id;


--
-- Name: InvoiceItems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."InvoiceItems" (
    id integer NOT NULL,
    name character varying(255),
    unit double precision,
    quantity double precision,
    total double precision,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "InvoiceId" integer,
    "QuotationId" integer
);


ALTER TABLE public."InvoiceItems" OWNER TO postgres;

--
-- Name: InvoiceItems_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."InvoiceItems_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."InvoiceItems_id_seq" OWNER TO postgres;

--
-- Name: InvoiceItems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."InvoiceItems_id_seq" OWNED BY public."InvoiceItems".id;


--
-- Name: Invoices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Invoices" (
    id integer NOT NULL,
    "firstName" character varying(255),
    "lastName" character varying(255),
    company character varying(255),
    address character varying(255),
    city character varying(255),
    "paymentDate" timestamp with time zone,
    total double precision,
    paid boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "CustomerId" integer,
    "RevenuId" integer,
    "totalDue" double precision DEFAULT '0'::double precision
);


ALTER TABLE public."Invoices" OWNER TO postgres;

--
-- Name: Invoices_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Invoices_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Invoices_id_seq" OWNER TO postgres;

--
-- Name: Invoices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Invoices_id_seq" OWNED BY public."Invoices".id;


--
-- Name: Quotations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Quotations" (
    id integer NOT NULL,
    "firstName" character varying(255),
    "lastName" character varying(255),
    company character varying(255),
    address character varying(255),
    city character varying(255),
    total double precision,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "CustomerId" integer,
    "RevenuId" integer,
    "cautionPaid" boolean DEFAULT false,
    "InvoiceId" integer
);


ALTER TABLE public."Quotations" OWNER TO postgres;

--
-- Name: Quotations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Quotations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Quotations_id_seq" OWNER TO postgres;

--
-- Name: Quotations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Quotations_id_seq" OWNED BY public."Quotations".id;


--
-- Name: RefreshTokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RefreshTokens" (
    id integer NOT NULL,
    token character varying(255),
    "expiryDate" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserId" integer
);


ALTER TABLE public."RefreshTokens" OWNER TO postgres;

--
-- Name: RefreshTokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RefreshTokens_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."RefreshTokens_id_seq" OWNER TO postgres;

--
-- Name: RefreshTokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RefreshTokens_id_seq" OWNED BY public."RefreshTokens".id;


--
-- Name: Revenus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Revenus" (
    id integer NOT NULL,
    total double precision,
    pro double precision,
    perso double precision,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Revenus" OWNER TO postgres;

--
-- Name: Revenus_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Revenus_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Revenus_id_seq" OWNER TO postgres;

--
-- Name: Revenus_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Revenus_id_seq" OWNED BY public."Revenus".id;


--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    password character varying(255),
    email character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: costs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.costs (
    id integer NOT NULL,
    name character varying(255),
    total double precision DEFAULT '0'::double precision,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "revenuId" integer
);


ALTER TABLE public.costs OWNER TO postgres;

--
-- Name: costs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.costs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.costs_id_seq OWNER TO postgres;

--
-- Name: costs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.costs_id_seq OWNED BY public.costs.id;


--
-- Name: credits; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.credits (
    id integer NOT NULL,
    reason character varying(255),
    creditor character varying(255),
    total double precision DEFAULT '0'::double precision,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "revenuId" integer
);


ALTER TABLE public.credits OWNER TO postgres;

--
-- Name: credits_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.credits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.credits_id_seq OWNER TO postgres;

--
-- Name: credits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.credits_id_seq OWNED BY public.credits.id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    company character varying(255),
    email character varying(255),
    phone character varying(255),
    address character varying(255),
    city character varying(255),
    siret character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customers_id_seq OWNER TO postgres;

--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- Name: invoiceItems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."invoiceItems" (
    id integer NOT NULL,
    quantity double precision DEFAULT '0'::double precision,
    unit double precision DEFAULT '0'::double precision,
    total double precision DEFAULT '0'::double precision,
    name character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "invoiceId" integer,
    "quotationId" integer
);


ALTER TABLE public."invoiceItems" OWNER TO postgres;

--
-- Name: invoiceItems_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."invoiceItems_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."invoiceItems_id_seq" OWNER TO postgres;

--
-- Name: invoiceItems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."invoiceItems_id_seq" OWNED BY public."invoiceItems".id;


--
-- Name: invoice_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.invoice_items (
    id integer NOT NULL,
    quantity double precision DEFAULT '0'::double precision,
    unit double precision DEFAULT '0'::double precision,
    total double precision DEFAULT '0'::double precision,
    name character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "invoiceId" integer
);


ALTER TABLE public.invoice_items OWNER TO postgres;

--
-- Name: invoice_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.invoice_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.invoice_items_id_seq OWNER TO postgres;

--
-- Name: invoice_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.invoice_items_id_seq OWNED BY public.invoice_items.id;


--
-- Name: invoiceitems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.invoiceitems (
    id integer NOT NULL,
    quantity double precision DEFAULT '0'::double precision,
    unit double precision DEFAULT '0'::double precision,
    total double precision DEFAULT '0'::double precision,
    name character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "invoiceId" integer
);


ALTER TABLE public.invoiceitems OWNER TO postgres;

--
-- Name: invoiceitems_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.invoiceitems_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.invoiceitems_id_seq OWNER TO postgres;

--
-- Name: invoiceitems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.invoiceitems_id_seq OWNED BY public.invoiceitems.id;


--
-- Name: invoices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.invoices (
    id integer NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    company character varying(255),
    address character varying(255),
    city character varying(255),
    payment_date timestamp with time zone,
    total double precision DEFAULT '0'::double precision,
    paid boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "customerId" integer,
    "revenuId" integer
);


ALTER TABLE public.invoices OWNER TO postgres;

--
-- Name: invoices_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.invoices_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.invoices_id_seq OWNER TO postgres;

--
-- Name: invoices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.invoices_id_seq OWNED BY public.invoices.id;


--
-- Name: quotations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quotations (
    id integer NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    company character varying(255),
    address character varying(255),
    city character varying(255),
    total double precision DEFAULT '0'::double precision,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "customerId" integer
);


ALTER TABLE public.quotations OWNER TO postgres;

--
-- Name: quotations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quotations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.quotations_id_seq OWNER TO postgres;

--
-- Name: quotations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quotations_id_seq OWNED BY public.quotations.id;


--
-- Name: revenus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.revenus (
    id integer NOT NULL,
    total double precision DEFAULT '0'::double precision,
    pro double precision DEFAULT '0'::double precision,
    perso double precision DEFAULT '0'::double precision,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.revenus OWNER TO postgres;

--
-- Name: revenus_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.revenus_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.revenus_id_seq OWNER TO postgres;

--
-- Name: revenus_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.revenus_id_seq OWNED BY public.revenus.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: Costs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Costs" ALTER COLUMN id SET DEFAULT nextval('public."Costs_id_seq"'::regclass);


--
-- Name: Credits id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Credits" ALTER COLUMN id SET DEFAULT nextval('public."Credits_id_seq"'::regclass);


--
-- Name: Cryptos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cryptos" ALTER COLUMN id SET DEFAULT nextval('public."Cryptos_id_seq"'::regclass);


--
-- Name: Customers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Customers" ALTER COLUMN id SET DEFAULT nextval('public."Customers_id_seq"'::regclass);


--
-- Name: InvoiceItems id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."InvoiceItems" ALTER COLUMN id SET DEFAULT nextval('public."InvoiceItems_id_seq"'::regclass);


--
-- Name: Invoices id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Invoices" ALTER COLUMN id SET DEFAULT nextval('public."Invoices_id_seq"'::regclass);


--
-- Name: Quotations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Quotations" ALTER COLUMN id SET DEFAULT nextval('public."Quotations_id_seq"'::regclass);


--
-- Name: RefreshTokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RefreshTokens" ALTER COLUMN id SET DEFAULT nextval('public."RefreshTokens_id_seq"'::regclass);


--
-- Name: Revenus id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Revenus" ALTER COLUMN id SET DEFAULT nextval('public."Revenus_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Name: costs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.costs ALTER COLUMN id SET DEFAULT nextval('public.costs_id_seq'::regclass);


--
-- Name: credits id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credits ALTER COLUMN id SET DEFAULT nextval('public.credits_id_seq'::regclass);


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Name: invoiceItems id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."invoiceItems" ALTER COLUMN id SET DEFAULT nextval('public."invoiceItems_id_seq"'::regclass);


--
-- Name: invoice_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoice_items ALTER COLUMN id SET DEFAULT nextval('public.invoice_items_id_seq'::regclass);


--
-- Name: invoiceitems id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoiceitems ALTER COLUMN id SET DEFAULT nextval('public.invoiceitems_id_seq'::regclass);


--
-- Name: invoices id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoices ALTER COLUMN id SET DEFAULT nextval('public.invoices_id_seq'::regclass);


--
-- Name: quotations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quotations ALTER COLUMN id SET DEFAULT nextval('public.quotations_id_seq'::regclass);


--
-- Name: revenus id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.revenus ALTER COLUMN id SET DEFAULT nextval('public.revenus_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: Costs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Costs" (id, name, total, "createdAt", "updatedAt", "RevenuId") FROM stdin;
1	Charge décembre	1320.63	2021-11-01 19:14:15.256+01	2021-11-01 19:14:15.256+01	1
2	Charge janvier	2045.51	2021-11-01 19:14:42.327+01	2021-11-01 19:14:42.327+01	2
3	1764.77	1764.77	2021-11-01 19:14:59.191+01	2021-11-01 19:15:16.823+01	3
5	charge mars	706.06	2021-11-01 19:17:07.701+01	2021-11-01 19:17:07.701+01	4
6	Charge Avril	136.96	2021-11-01 19:17:24.454+01	2021-11-01 19:17:24.454+01	5
7	Charge Mai	645.5	2021-11-01 19:17:44.292+01	2021-11-01 19:17:44.292+01	6
8	Charges juin	1167.63	2021-11-01 19:18:37.021+01	2021-11-01 19:18:37.021+01	7
9	907.62	907.62	2021-11-01 19:20:40.134+01	2021-11-01 19:20:53.162+01	8
10	Charges aout	1706	2021-11-01 19:21:33.874+01	2021-11-01 19:21:33.874+01	9
13	Charge novembre	1014.51	2021-11-01 19:35:13.455+01	2021-11-01 19:35:13.455+01	12
12	Charge d'octobre	1611.02	2021-11-01 19:34:48.499+01	2021-11-01 19:35:25.72+01	11
11	2494.15	2495.15	2021-11-01 19:33:49.598+01	2021-11-01 19:35:43.596+01	10
14	Décembre	3185.14	2021-11-01 19:36:26.945+01	2021-11-01 19:36:26.945+01	13
4	706.06	2457.45	2021-11-01 19:15:58.23+01	2021-11-01 19:37:36.068+01	14
16	Charge Mars	2181.22	2021-11-01 19:38:23.739+01	2021-11-01 19:38:23.739+01	16
17	Charge Avril	2915.91	2021-11-01 19:38:47.169+01	2021-11-01 19:38:47.169+01	17
18	Charge mai	2853.43	2021-11-01 19:39:06.088+01	2021-11-01 19:39:06.088+01	18
19	Charge juin	2940.82	2021-11-01 19:39:34.233+01	2021-11-01 19:39:34.233+01	19
20	Charge juillet	4555.86	2021-11-01 19:40:22.718+01	2021-11-01 19:40:22.718+01	20
15	Charge février	3170.74	2021-11-01 19:37:55.6+01	2021-11-03 13:51:49.218+01	15
21	Dépense mensuelle	3560.65	2021-11-06 18:15:05.56+01	2021-11-06 18:24:39.584+01	21
22	Mois de Septembre	2008.97	2021-11-06 18:31:42.888+01	2021-11-06 18:31:42.888+01	22
23	Charge octobre	3489.12	2021-11-06 18:34:21.427+01	2021-11-06 18:34:21.427+01	23
25		0	2021-11-06 18:57:11.145+01	2021-11-06 18:57:11.145+01	21
\.


--
-- Data for Name: Credits; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Credits" (id, creditor, reason, total, "createdAt", "updatedAt", "RevenuId") FROM stdin;
1	mamie	hb	100	2021-10-29 12:33:55.397+02	2021-10-29 12:33:55.397+02	1
2	Michel van Megen		379	2021-11-01 19:45:25.783+01	2021-11-01 19:45:25.783+01	2
3	Name cheap		8.98	2021-11-01 19:45:25.784+01	2021-11-01 19:45:25.784+01	2
4	Moi Lydia		143.6	2021-11-01 19:45:25.784+01	2021-11-01 19:45:25.784+01	2
5	HSBC		45	2021-11-01 19:45:25.784+01	2021-11-01 19:45:25.784+01	2
6	Uber Eat		13	2021-11-01 19:45:25.784+01	2021-11-01 19:45:25.784+01	2
7	Thomas Krief		100	2021-11-01 19:47:04.74+01	2021-11-01 19:47:04.74+01	3
8	Uber Eat		50.49	2021-11-01 19:47:04.74+01	2021-11-01 19:47:04.74+01	3
9	Momox		6.26	2021-11-01 19:47:04.74+01	2021-11-01 19:47:04.74+01	3
10	AMF		350	2021-11-01 19:47:04.74+01	2021-11-01 19:47:04.74+01	3
11	?		43.38	2021-11-01 19:47:04.74+01	2021-11-01 19:47:04.74+01	3
12	Uber Eat		16	2021-11-01 19:47:04.74+01	2021-11-01 19:47:04.74+01	3
13	Mamie		100	2021-11-01 19:47:04.74+01	2021-11-01 19:47:04.74+01	3
14	Moi Lydia		80	2021-11-01 19:47:04.741+01	2021-11-01 19:47:04.741+01	3
15	maman		120	2021-11-01 19:49:13.078+01	2021-11-01 19:49:13.078+01	4
16	maman		50	2021-11-01 19:49:13.078+01	2021-11-01 19:49:13.078+01	4
17	momox		15.3	2021-11-01 19:49:13.078+01	2021-11-01 19:49:13.078+01	4
18	SNCF		148	2021-11-01 19:49:13.078+01	2021-11-01 19:49:13.078+01	4
19	Fanny		110	2021-11-01 19:49:13.078+01	2021-11-01 19:49:13.078+01	4
20	Moi Lydia		27.5	2021-11-01 19:49:13.078+01	2021-11-01 19:49:13.078+01	4
22	Asos		27	2021-11-01 19:51:39.026+01	2021-11-01 19:51:39.026+01	6
23	Johanna		59	2021-11-01 19:52:30.045+01	2021-11-01 19:52:30.045+01	7
24	Justin Picon		26	2021-11-01 19:52:30.045+01	2021-11-01 19:52:30.045+01	7
25	Justin		164	2021-11-01 19:52:30.045+01	2021-11-01 19:52:30.045+01	7
26	Fanny		32	2021-11-01 19:52:30.045+01	2021-11-01 19:52:30.045+01	7
27	Lydia		32	2021-11-01 19:52:58.801+01	2021-11-01 19:52:58.801+01	8
28	Fanny		257.17	2021-11-01 19:53:24.675+01	2021-11-01 19:53:24.675+01	9
29	Fanny		20	2021-11-01 19:53:24.675+01	2021-11-01 19:53:24.675+01	9
30	Fanny		380	2021-11-01 19:54:30.284+01	2021-11-01 19:54:30.284+01	10
31	Maman		115	2021-11-01 19:54:30.284+01	2021-11-01 19:54:30.284+01	10
32	Papi		100	2021-11-01 19:54:30.284+01	2021-11-01 19:54:30.284+01	10
33	Fanny		100	2021-11-01 19:54:30.284+01	2021-11-01 19:54:30.284+01	10
34	Tatie		1000	2021-11-01 19:54:30.284+01	2021-11-01 19:54:46.446+01	10
35	Acontraluz		50	2021-11-01 19:55:50.286+01	2021-11-01 19:55:50.286+01	11
36	Fanny		50	2021-11-01 19:55:50.286+01	2021-11-01 19:55:50.286+01	11
37	Fanny		100	2021-11-01 19:55:50.286+01	2021-11-01 19:55:50.286+01	11
38	Fanny		25	2021-11-01 19:55:50.286+01	2021-11-01 19:55:50.286+01	11
39	Uber		1	2021-11-01 19:55:50.286+01	2021-11-01 19:55:50.286+01	11
40	jsp		70	2021-11-01 19:55:50.286+01	2021-11-01 19:55:50.286+01	11
44	Nike		88.53	2021-11-01 20:00:58.05+01	2021-11-01 20:00:58.05+01	13
45	Johanna		184	2021-11-01 20:00:58.05+01	2021-11-01 20:00:58.05+01	13
46	Fanny		360	2021-11-01 20:00:58.05+01	2021-11-01 20:00:58.05+01	13
47	Fanny		634	2021-11-01 20:00:58.05+01	2021-11-01 20:00:58.05+01	13
48	Mamie		200	2021-11-01 20:00:58.05+01	2021-11-01 20:00:58.05+01	13
49	Tatie		30	2021-11-01 20:00:58.05+01	2021-11-01 20:00:58.05+01	13
50	SCOC		259	2021-11-01 20:00:58.05+01	2021-11-01 20:00:58.05+01	13
51	maman		150	2021-11-01 20:00:58.05+01	2021-11-01 20:00:58.05+01	13
52	Fanny		60	2021-11-01 20:01:23.04+01	2021-11-01 20:01:23.04+01	14
53	Fanny		74	2021-11-01 20:01:23.041+01	2021-11-01 20:01:23.041+01	14
54	Fanny		125	2021-11-01 20:01:23.041+01	2021-11-01 20:01:23.041+01	14
55	Fanny		210	2021-11-01 20:02:59.035+01	2021-11-01 20:02:59.035+01	\N
56	Private sport shop		17.99	2021-11-01 20:02:59.036+01	2021-11-01 20:02:59.036+01	15
57	cdiscount		15.97	2021-11-01 20:02:59.036+01	2021-11-01 20:02:59.036+01	15
58	papa		225	2021-11-01 20:02:59.037+01	2021-11-01 20:02:59.037+01	15
59	Vente privée		96.58	2021-11-01 20:02:59.037+01	2021-11-01 20:02:59.037+01	15
60	Maman		50	2021-11-01 20:02:59.037+01	2021-11-01 20:02:59.037+01	15
61	Avant gardiste		32.9	2021-11-01 20:02:59.037+01	2021-11-01 20:02:59.037+01	15
62	Mamie		100	2021-11-01 20:02:59.037+01	2021-11-01 20:02:59.037+01	15
64	Tatie		230	2021-11-01 20:03:25.964+01	2021-11-01 20:03:25.964+01	16
65	Tatie		100	2021-11-01 20:03:53.363+01	2021-11-01 20:03:53.363+01	17
66	Anto		100	2021-11-01 20:03:53.363+01	2021-11-01 20:03:53.363+01	17
67	Tatie		100	2021-11-01 20:04:29.283+01	2021-11-01 20:04:29.283+01	18
68	Fanny		300	2021-11-01 20:04:29.284+01	2021-11-01 20:04:29.284+01	18
69	Tatie		100	2021-11-01 20:06:40.383+01	2021-11-01 20:06:40.383+01	19
70	Amazon		42.44	2021-11-01 20:06:40.383+01	2021-11-01 20:06:40.383+01	19
71	Amazon		38.48	2021-11-01 20:06:40.383+01	2021-11-01 20:06:40.383+01	19
72	Amazon		51.29	2021-11-01 20:06:40.383+01	2021-11-01 20:06:40.383+01	19
73	Maman		362	2021-11-01 20:06:40.383+01	2021-11-01 20:06:40.383+01	19
74	Mammut		29.75	2021-11-01 20:06:40.383+01	2021-11-01 20:06:40.383+01	19
75	Asos		31.49	2021-11-01 20:06:40.383+01	2021-11-01 20:06:40.383+01	19
76	SFPMEI		59	2021-11-01 20:06:40.383+01	2021-11-01 20:06:40.383+01	19
77	Boulanger		47.99	2021-11-01 20:06:40.383+01	2021-11-01 20:06:40.383+01	19
78	Mammut		36.7	2021-11-01 20:06:40.383+01	2021-11-01 20:06:40.383+01	19
79	Rogue		98.62	2021-11-01 20:08:05.145+01	2021-11-01 20:08:05.145+01	20
80	Jamu		280	2021-11-01 20:08:05.145+01	2021-11-01 20:08:05.145+01	20
81	Amazon		3.24	2021-11-01 20:08:05.145+01	2021-11-01 20:08:05.145+01	20
82	UnderArmor		28.05	2021-11-01 20:08:05.145+01	2021-11-01 20:08:05.145+01	20
83	Amazon		2.53	2021-11-01 20:08:05.145+01	2021-11-01 20:08:05.145+01	20
63	cdiscountt		29.99	2021-11-01 20:02:59.037+01	2021-11-03 13:49:41.648+01	15
87	Amazon	remboursement	2.53	2021-11-06 18:15:05.538+01	2021-11-06 18:15:05.538+01	21
88	Virement sepa		17	2021-11-06 18:15:05.539+01	2021-11-06 18:15:05.539+01	21
89	Nice 	remboursement	158.4	2021-11-06 18:15:05.539+01	2021-11-06 18:15:05.539+01	21
90	Maman	voyage anniv	300	2021-11-06 18:15:05.539+01	2021-11-06 18:15:05.539+01	21
92	Fanny	remboursement	80	2021-11-06 18:33:58.808+01	2021-11-06 18:33:58.808+01	22
93	Dott	remboursement	3	2021-11-06 18:33:58.808+01	2021-11-06 18:33:58.808+01	22
94	Nathalie	SCNF	140	2021-11-06 18:33:58.808+01	2021-11-06 18:33:58.808+01	22
95	Anto 	amende	45	2021-11-06 18:33:58.808+01	2021-11-06 18:33:58.808+01	22
96	Papa	Avion	637	2021-11-06 18:33:58.809+01	2021-11-06 18:33:58.809+01	22
97	Amazon	remboursement	1.8	2021-11-06 18:35:46.336+01	2021-11-06 18:35:46.336+01	23
98	Coinbase	remboursement	1	2021-11-06 18:35:46.336+01	2021-11-06 18:35:46.336+01	23
99	Nathalie	remboursement	425	2021-11-06 18:35:46.336+01	2021-11-06 18:35:46.336+01	23
100	Justin	remboursement	160	2021-11-06 18:35:46.336+01	2021-11-06 18:35:46.336+01	23
101	Justin	remboursement	512	2021-11-06 18:35:46.337+01	2021-11-06 18:35:46.337+01	23
102	High Society	Hébergement aout	50.88	2021-11-06 18:57:11.139+01	2021-11-06 18:57:11.139+01	21
103	High Society	Hébergement septembre	50.88	2021-11-06 18:57:11.139+01	2021-11-06 18:57:11.139+01	21
\.


--
-- Data for Name: Cryptos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Cryptos" (id, "buyingDate", name, price, "pricePurchase", "quantityPurchase", "priceChange", "createdAt", "updatedAt") FROM stdin;
1	2021-11-18 01:00:00+01	Decentraland	\N	3.15	30.51071175	\N	2021-11-28 18:44:32.122+01	2021-11-28 18:44:32.122+01
\.


--
-- Data for Name: Customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Customers" (id, "firstName", "lastName", company, email, phone, address, city, siret, "createdAt", "updatedAt") FROM stdin;
1	Jonathan	Chaffanjon	Platon Formation	platonformation@gmail.com	0610678331	198 chemin de l'abreuvoir	07430 Saint Clair		2021-10-28 19:47:09.647+02	2021-10-28 19:47:09.647+02
2	Simon	Plinet	REFLEX OSTEO	Simon.plinet@gmail.com	0695028899	14 Rue Berjon	Lyon		2021-10-28 19:47:09.649+02	2021-10-28 19:47:09.649+02
5	Thomas	Krief	THOMAS KRIEF ART	thomas.krief@gmail.com	0608955762		Annecy		2021-10-28 19:47:09.655+02	2021-10-28 19:47:09.655+02
3	Matthieu	Cartiller	Patchouli Franchise LE WAGON	test@gmail.com	0695028899	20 rue des capucins	Lyon		2021-10-28 19:47:09.651+02	2021-10-28 19:48:51.779+02
4	Thomas	Roux	CMCMRS DISTRIBUTION	thomas@highsociety.fr	0635236650	325 Rue saint pierre	Marseille	84060434200021	2021-10-28 19:47:09.652+02	2021-10-29 18:36:48.506+02
6	Claire	Coderey	Misimo	Cdy.claire@hotmail.fr	0635594863		Annecy		2021-10-28 19:47:09.657+02	2021-11-03 19:07:49.109+01
\.


--
-- Data for Name: InvoiceItems; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."InvoiceItems" (id, name, unit, quantity, total, "createdAt", "updatedAt", "InvoiceId", "QuotationId") FROM stdin;
1	Référencement	30	21	630	2021-10-28 19:51:44.066+02	2021-10-28 19:51:44.066+02	1	\N
2	Gestion de DB	30	28	840	2021-10-28 19:51:44.066+02	2021-10-28 19:51:44.066+02	1	\N
3	Debug 	30	8	240	2021-10-28 20:00:19.35+02	2021-10-28 20:00:19.35+02	2	\N
4	Js Menu Highlight	30	1	30	2021-10-28 20:00:19.35+02	2021-10-28 20:00:19.35+02	2	\N
5	JS Etat formation	30	1	30	2021-10-28 20:00:19.351+02	2021-10-28 20:00:19.351+02	2	\N
6	DatePicker	30	4	120	2021-10-28 20:01:01.232+02	2021-10-28 20:01:01.232+02	3	\N
7	Modal Edit	30	4	120	2021-10-28 20:01:01.233+02	2021-10-28 20:01:01.233+02	3	\N
8	Modal New	30	1	30	2021-10-28 20:01:01.233+02	2021-10-28 20:01:01.233+02	3	\N
9	Show sesion validation formation	30	2	60	2021-10-28 20:01:01.233+02	2021-10-28 20:01:01.233+02	3	\N
10	Gem Mail 	30	5	150	2021-10-28 20:02:06.665+02	2021-10-28 20:02:06.665+02	4	\N
11	Prod	30	9	270	2021-10-28 20:02:06.665+02	2021-10-28 20:02:06.665+02	4	\N
12	Gem import	30	3	90	2021-10-28 20:02:06.667+02	2021-10-28 20:02:06.667+02	4	\N
13	View clients	30	3	90	2021-10-28 20:02:06.667+02	2021-10-28 20:02:06.667+02	4	\N
14	View admin	30	16	480	2021-10-28 20:02:06.667+02	2021-10-28 20:02:06.667+02	4	\N
15	Controllers	30	16	480	2021-10-28 20:02:06.668+02	2021-10-28 20:02:06.668+02	4	\N
16	Questionnaire client	35	8	280	2021-10-28 20:02:30.456+02	2021-10-28 20:02:30.456+02	5	\N
17	Disponibility 	35	10	350	2021-10-28 20:05:01.387+02	2021-10-28 20:05:01.387+02	6	\N
18	Css amélioration	35	3	105	2021-10-28 20:05:01.387+02	2021-10-28 20:05:01.387+02	6	\N
19	Autogrow field js	35	4	140	2021-10-28 20:05:01.388+02	2021-10-28 20:05:01.388+02	6	\N
20	Search suggestion / Autofill new service 	35	7	245	2021-10-28 20:05:01.388+02	2021-10-28 20:05:01.388+02	6	\N
21	Chat	35	14	490	2021-10-28 20:05:01.388+02	2021-10-28 20:05:01.388+02	6	\N
22	Controller & view	35	9	315	2021-10-29 11:28:48.121+02	2021-10-29 11:28:48.121+02	7	\N
23	Css card	35	5	175	2021-10-29 11:29:34.272+02	2021-10-29 11:29:34.272+02	8	\N
24	Tags	35	4	140	2021-10-29 11:29:34.272+02	2021-10-29 11:29:34.272+02	8	\N
25	Devise pas connecté	35	4	140	2021-10-29 11:29:34.272+02	2021-10-29 11:29:34.272+02	8	\N
26	Service expert = 1	35	1	35	2021-10-29 11:29:34.272+02	2021-10-29 11:29:34.272+02	8	\N
27	Homepage tpass	35	4	140	2021-10-29 11:34:29.101+02	2021-10-29 11:34:29.101+02	9	\N
28	Redis	35	2	70	2021-10-29 11:34:29.101+02	2021-10-29 11:34:29.101+02	9	\N
29	Login/SignUp	35	1	35	2021-10-29 11:34:29.101+02	2021-10-29 11:34:29.101+02	9	\N
30	Devise pseudo + tpass	35	2	70	2021-10-29 11:34:29.101+02	2021-10-29 11:34:29.101+02	9	\N
31	Flatpickr	35	1	35	2021-10-29 11:34:29.101+02	2021-10-29 11:34:29.101+02	9	\N
32	Boutique UI	35	2	70	2021-10-29 11:35:32.68+02	2021-10-29 11:35:32.68+02	10	\N
33	Parrainage	35	15	525	2021-10-29 11:35:32.68+02	2021-10-29 11:35:32.68+02	10	\N
34	Gestion tpass privés	35	5	175	2021-10-29 11:35:32.68+02	2021-10-29 11:35:32.68+02	10	\N
35	Gestion de tpass	35	20	700	2021-10-29 11:35:32.68+02	2021-10-29 11:35:32.68+02	10	\N
36	Import filleuls	35	8	280	2021-10-29 11:35:55.867+02	2021-10-29 11:35:55.867+02	11	\N
37	Paginate	35	1	35	2021-10-29 11:36:22.874+02	2021-10-29 11:36:22.874+02	12	\N
38	ShopTransaction	35	8	280	2021-10-29 11:36:22.874+02	2021-10-29 11:36:22.874+02	12	\N
39	PlatonDB factures	250	2	500	2021-10-29 11:36:46.452+02	2021-10-29 11:36:46.452+02	13	\N
40		0	0	0	2021-10-29 16:33:29.898+02	2021-10-29 16:33:29.898+02	\N	\N
41	Search	120	1	120	2021-10-29 17:17:47.934+02	2021-10-29 17:17:47.934+02	15	\N
42	Geocoding	120	1	120	2021-10-29 17:17:47.934+02	2021-10-29 17:17:47.934+02	15	\N
43	Authorizations & Pundit	120	1	120	2021-10-29 17:17:47.934+02	2021-10-29 17:17:47.934+02	15	\N
44	Hosting & image upload	100	1	100	2021-10-29 17:17:47.934+02	2021-10-29 17:17:47.934+02	15	\N
45	Dom & events	100	1	100	2021-10-29 17:17:47.934+02	2021-10-29 17:17:47.934+02	15	\N
46	Associations & validations	100	1	100	2021-10-29 17:17:47.935+02	2021-10-29 17:17:47.935+02	15	\N
47	Cookbook (Day 2)	100	1	100	2021-10-29 17:17:47.935+02	2021-10-29 17:17:47.935+02	15	\N
48	Site vitrine	30	10	300	2021-10-29 17:21:52.44+02	2021-10-29 17:21:52.44+02	16	\N
49		0	0	0	2021-10-29 17:41:06.704+02	2021-10-29 17:41:06.704+02	\N	\N
50	Temoignage	20	19	380	2021-10-29 17:47:32.495+02	2021-10-29 17:47:32.495+02	18	\N
51	Teleconsultation	20	19	380	2021-10-29 17:47:32.495+02	2021-10-29 17:47:32.495+02	18	\N
52	Email covid	20	1	20	2021-10-29 17:47:32.495+02	2021-10-29 17:47:32.495+02	18	\N
53	Bannière covid	20	1	20	2021-10-29 17:47:32.495+02	2021-10-29 17:47:32.495+02	18	\N
54	Landing page	20	5	100	2021-10-29 17:50:46.168+02	2021-10-29 17:50:46.168+02	19	\N
55	Bon ostéo par ville	20	10	200	2021-10-29 17:50:46.168+02	2021-10-29 17:50:46.168+02	19	\N
56	Hub blog	20	15	300	2021-10-29 17:50:46.168+02	2021-10-29 17:50:46.168+02	19	\N
57	Amélioration des performances	20	10	200	2021-10-29 17:50:46.168+02	2021-10-29 17:50:46.168+02	19	\N
58	Stats filtre par ville	80	1	80	2021-10-29 17:58:41.5+02	2021-10-29 17:58:41.5+02	20	\N
59	Patient réorienté	80	0.25	20	2021-10-29 17:58:41.5+02	2021-10-29 17:58:41.5+02	20	\N
60	Filtre indisponible	80	0.25	20	2021-10-29 17:58:41.5+02	2021-10-29 17:58:41.5+02	20	\N
61	Consult recherche par tel	80	0.25	20	2021-10-29 17:58:41.5+02	2021-10-29 17:58:41.5+02	20	\N
62	Ostéo icon absent	80	0.25	20	2021-10-29 17:58:41.5+02	2021-10-29 17:58:41.5+02	20	\N
63	Ostéo animalier	80	0.25	20	2021-10-29 17:58:41.5+02	2021-10-29 17:58:41.5+02	20	\N
64	Avis négatif pas affichés	80	0.25	20	2021-10-29 17:58:41.5+02	2021-10-29 17:58:41.5+02	20	\N
65	Questionnaire entreprise	80	0.5	40	2021-10-29 17:58:41.501+02	2021-10-29 17:58:41.501+02	20	\N
66	Reviews stats	80	1	80	2021-10-29 17:58:41.501+02	2021-10-29 17:58:41.501+02	20	\N
67	Review order_by	80	0.75	60	2021-10-29 17:58:41.501+02	2021-10-29 17:58:41.501+02	20	\N
68	Bugfix	80	0.25	20	2021-10-29 17:58:41.501+02	2021-10-29 17:58:41.501+02	20	\N
69	Mise en prod	80	2	160	2021-10-29 18:02:38.227+02	2021-10-29 18:02:38.227+02	21	\N
70	Type de praticien	80	1	80	2021-10-29 18:02:38.227+02	2021-10-29 18:02:38.227+02	21	\N
71	Review questionnaire entreprise	80	0.5	40	2021-10-29 18:02:38.227+02	2021-10-29 18:02:38.227+02	21	\N
72	Praticien réorientés	80	1	80	2021-10-29 18:02:38.227+02	2021-10-29 18:02:38.227+02	21	\N
73	Stats intervalle par jour ou mois	80	1	80	2021-10-29 18:02:38.227+02	2021-10-29 18:02:38.227+02	21	\N
74	Stats par heure	80	1	80	2021-10-29 18:02:38.227+02	2021-10-29 18:02:38.227+02	21	\N
75	Filtre par code postal	80	0.5	40	2021-10-29 18:02:38.227+02	2021-10-29 18:02:38.227+02	21	\N
76	Facture d'Octobre	200	8	1600	2021-10-29 18:30:31.65+02	2021-10-29 18:30:31.65+02	22	\N
77	Mois de novembre	200	4	800	2021-10-29 18:32:16.904+02	2021-10-29 18:32:16.904+02	23	\N
78	Mois de décembre	200	4	800	2021-10-29 18:44:27.566+02	2021-10-29 18:44:27.566+02	24	\N
79	Mois de janvier	200	8	1600	2021-10-29 18:45:15.198+02	2021-10-29 18:45:15.198+02	25	\N
80	Mois de février	200	8	1600	2021-10-29 18:46:31.552+02	2021-10-29 18:46:31.552+02	26	\N
81	Mois de mars	200	8	1600	2021-10-29 18:46:48.975+02	2021-10-29 18:46:48.975+02	27	\N
82	Mois d'Avril	200	8	1600	2021-10-29 18:47:15.598+02	2021-10-29 18:47:15.598+02	28	\N
83	Mois de mai	200	8	1600	2021-10-29 18:50:26.002+02	2021-10-29 18:50:26.002+02	29	\N
84	Mois de juin	200	8	1600	2021-10-29 18:52:18.217+02	2021-10-29 18:52:18.217+02	30	\N
85	Mois de septembre	200	8	1600	2021-10-29 18:52:59.748+02	2021-10-29 18:52:59.748+02	31	\N
86	Mise en ligne & tests	250	3.875	968.75	2021-10-29 19:17:07.76+02	2021-10-29 19:17:07.76+02	\N	\N
87	BackOffice	250	13.75	3437.5	2021-10-29 19:17:07.76+02	2021-10-29 19:17:07.76+02	\N	\N
88	Base de donnée	250	4.625	1156.25	2021-10-29 19:17:07.76+02	2021-10-29 19:17:07.76+02	\N	\N
89	Intégration PrestaShop	300	2	600	2021-11-01 11:01:30.904+01	2021-11-01 16:22:13.024+01	34	1
90	Intégration	300	4	1200	2021-11-01 11:01:30.904+01	2021-11-01 16:22:13.025+01	34	1
91	CRUD Facture & PDF	300	1.5	450	2021-11-01 11:01:30.904+01	2021-11-01 16:22:13.025+01	34	1
92	User authentication & authorization	300	1.5	450	2021-11-01 11:01:30.904+01	2021-11-01 16:22:13.025+01	34	1
93	CRUD stock & temps réel	300	2	600	2021-11-01 11:01:30.904+01	2021-11-01 16:22:13.025+01	34	1
94	CRUD commande	300	1.5	450	2021-11-01 11:01:30.904+01	2021-11-01 16:22:13.026+01	34	1
95	CRUD bon de prod	300	1	300	2021-11-01 11:01:30.904+01	2021-11-01 16:22:13.026+01	34	1
96	CRUD consommables	300	1	300	2021-11-01 11:01:30.904+01	2021-11-01 16:22:13.026+01	34	1
97	CRUD produits	300	1.5	450	2021-11-01 11:01:30.904+01	2021-11-01 16:22:13.027+01	34	1
98	Model & liaison	300	2	600	2021-11-01 11:01:30.905+01	2021-11-01 16:22:13.027+01	34	1
99	Routing	300	1	300	2021-11-01 11:01:30.905+01	2021-11-01 16:22:13.027+01	34	1
127	Commande : Numéro de tracking	300	0.5	150	2021-11-01 16:43:55.933+01	2021-11-01 16:43:55.933+01	\N	\N
100	Schema DB & implementation	300	2	600	2021-11-01 11:01:30.905+01	2021-11-01 16:23:04.273+01	34	1
123	Commande : Numéro de tracking	300	0.5	\N	2021-11-01 16:37:00.621+01	2021-11-01 16:37:00.621+01	\N	\N
124	Commande : Bon de livraison	300	2	\N	2021-11-01 16:37:00.621+01	2021-11-01 16:37:00.621+01	\N	\N
125	Commande : Numéro de tracking	300	0.5	\N	2021-11-01 16:38:31.966+01	2021-11-01 16:38:31.966+01	\N	\N
126	Commande : Bon de livraison	300	2	\N	2021-11-01 16:38:31.966+01	2021-11-01 16:38:31.966+01	\N	\N
130	Commande : Bon de livraison	300	2	600	2021-11-01 16:50:12.165+01	2021-11-01 17:52:09.447+01	44	2
132	BackOffice	250	13.75	3437.5	2021-11-01 17:01:05.587+01	2021-11-01 18:09:39.146+01	45	4
111	Jours de réserve (optionnels et modulables)	200	3	600	2021-11-01 16:34:37.867+01	2021-11-01 16:34:37.867+01	\N	\N
112	Export CSV : Indicateur sur période donnée	300	0.5	150	2021-11-01 16:34:37.867+01	2021-11-01 16:34:37.867+01	\N	\N
113	Statistiques : indicateur sur période donnée	300	2	600	2021-11-01 16:34:37.867+01	2021-11-01 16:34:37.867+01	\N	\N
114	Commande : ordre de paiement	300	0.5	150	2021-11-01 16:34:37.867+01	2021-11-01 16:34:37.867+01	\N	\N
115	Facture : Somme total sur période donnée	300	0.5	150	2021-11-01 16:34:37.867+01	2021-11-01 16:34:37.867+01	\N	\N
116	Mailing : Mise en place système de mail (envoie auto de facture)	300	1	300	2021-11-01 16:34:37.867+01	2021-11-01 16:34:37.867+01	\N	\N
117	Avoir : Ajout des avoirs	300	1	300	2021-11-01 16:34:37.867+01	2021-11-01 16:34:37.867+01	\N	\N
118	Produit : Consulting	300	0.25	75	2021-11-01 16:34:37.867+01	2021-11-01 16:34:37.867+01	\N	\N
119	Bon de prod : Statut annulé	300	0.25	75	2021-11-01 16:34:37.867+01	2021-11-01 16:34:37.867+01	\N	\N
120	Commande : Bon de livraison	300	2	600	2021-11-01 16:34:37.867+01	2021-11-01 16:34:37.867+01	\N	\N
121	Commande : Numéro de tracking	300	0.5	150	2021-11-01 16:34:37.867+01	2021-11-01 16:34:37.867+01	\N	\N
122	Devis : Date de validité détermine son état	300	0.5	150	2021-11-01 16:34:37.867+01	2021-11-01 16:34:37.867+01	\N	\N
128	Commande : Numéro de tracking	200	300	60000	2021-11-01 16:44:53.135+01	2021-11-01 16:44:53.135+01	\N	\N
136	Facture : modifiable une fois créée	300	0.5	150	2021-11-01 18:34:59.073+01	2021-11-01 18:34:59.073+01	46	\N
102	Export CSV : Indicateur sur période donnée	300	0.5	150	2021-11-01 16:30:37.083+01	2021-11-01 17:52:09.446+01	44	2
103	Statistiques : indicateur sur période donnée	300	2	600	2021-11-01 16:30:37.083+01	2021-11-01 17:52:09.446+01	44	2
104	Commande : ordre de paiement	300	0.5	150	2021-11-01 16:30:37.083+01	2021-11-01 17:52:09.446+01	44	2
105	Facture : Somme total sur période donnée	300	0.5	150	2021-11-01 16:30:37.083+01	2021-11-01 17:52:09.447+01	44	2
106	Mailing : Mise en place système de mail (envoie auto de facture)	300	1	300	2021-11-01 16:30:37.083+01	2021-11-01 17:52:09.447+01	44	2
107	Devis : Date de validité détermine son état	300	0.5	150	2021-11-01 16:30:37.083+01	2021-11-01 17:52:09.447+01	44	2
137	Facture : extraction XML	300	0.5	150	2021-11-01 18:34:59.073+01	2021-11-01 18:34:59.073+01	46	\N
110	Bon de prod : Statut annulé	300	0.25	75	2021-11-01 16:30:37.085+01	2021-11-01 17:52:09.447+01	44	2
108	Produit : consulting	300	0.25	75	2021-11-01 16:30:37.085+01	2021-11-01 17:52:09.447+01	44	2
129	Commande : Numéro de tracking	300	0.5	150	2021-11-01 16:49:41.407+01	2021-11-01 17:52:09.447+01	44	2
131	Mise en ligne & tests	250	3.875	968.75	2021-11-01 17:01:05.587+01	2021-11-01 18:09:39.146+01	45	4
133	Base de donnée	250	4.625	1156.25	2021-11-01 17:01:05.587+01	2021-11-01 18:09:39.146+01	45	4
101	Jours de réserve (optionnels et modulables)	0	3	0	2021-11-01 16:30:37.083+01	2021-11-01 18:31:00.176+01	44	2
109	Avoir : Ajout des avoirs	0	1	0	2021-11-01 16:30:37.083+01	2021-11-01 18:31:00.188+01	44	2
138	Facture : recherche par magasin, entreprise ou client	300	0.125	37.5	2021-11-01 18:34:59.073+01	2021-11-01 18:34:59.073+01	46	\N
139	Client : suppressions des champs	300	0.25	75	2021-11-01 18:34:59.074+01	2021-11-01 18:34:59.074+01	46	\N
140	Facture : choix du paiement	300	0.5	150	2021-11-01 18:34:59.074+01	2021-11-01 18:34:59.074+01	46	\N
141	Facture : recherche par montant	300	0.125	37.5	2021-11-01 18:34:59.074+01	2021-11-01 18:34:59.074+01	46	\N
134	Mise en ligne & tests	250	2.5	625	2021-11-01 17:54:21.366+01	2021-11-01 18:45:28.787+01	47	5
135	FrontOffice	250	17	4250	2021-11-01 17:54:21.367+01	2021-11-01 18:45:28.787+01	47	5
142	Commerciaux : Masquer les stocks à 0	300	0.25	75	2021-11-01 18:56:26.904+01	2021-11-01 18:56:26.904+01	48	\N
143	Franchisés : Case expédier/deposer	300	0.125	37.5	2021-11-01 18:56:26.905+01	2021-11-01 18:56:26.905+01	48	\N
144	Franchisés : Relance preuve de paiement	300	0.125	37.5	2021-11-01 18:56:26.905+01	2021-11-01 18:56:26.905+01	48	\N
145	Produits : Supprimer famille Integres	300	0.125	37.5	2021-11-01 18:56:26.905+01	2021-11-01 18:56:26.905+01	48	\N
146	Utilisateurs : Nouveau type de franchisé	300	0.625	187.5	2021-11-01 18:56:26.905+01	2021-11-01 18:56:26.905+01	48	\N
147	Alerte stock indisponible	300	0.25	75	2021-11-01 18:57:51.988+01	2021-11-01 18:57:51.988+01	49	\N
148	Profil Sales manager	300	0.25	75	2021-11-01 18:57:51.988+01	2021-11-01 18:57:51.988+01	49	\N
149	Accès limité au produits b2b	300	0.25	75	2021-11-01 18:57:51.988+01	2021-11-01 18:57:51.988+01	49	\N
150	Avoir gestion retour stock	300	0.25	75	2021-11-01 18:57:51.988+01	2021-11-01 18:57:51.988+01	49	\N
151	Alert administrateur	300	0.375	112.5	2021-11-01 18:57:51.988+01	2021-11-01 18:57:51.988+01	49	\N
152	Sous famille produit	300	0.75	225	2021-11-01 18:57:51.988+01	2021-11-01 18:57:51.988+01	49	\N
153		0	0	0	2021-11-03 09:40:20.269+01	2021-11-03 09:40:20.269+01	\N	\N
154	Caution payée	0	0	-1890	2021-11-03 17:52:06.66+01	2021-11-03 17:52:06.66+01	34	\N
155	Caution payée	0	0	-1668.75	2021-11-03 18:11:16.191+01	2021-11-03 18:11:16.191+01	45	\N
156	Caution payée	0	0	-1462.5	2021-11-03 18:11:36.564+01	2021-11-03 18:11:36.564+01	47	\N
157	DB Location changements	250	0.25	62.5	2021-11-03 19:21:26.525+01	2021-11-03 19:21:26.525+01	51	\N
158	DB Loyers changements	250	0.25	62.5	2021-11-03 19:21:26.525+01	2021-11-03 19:21:26.525+01	51	\N
159	Backoffice Loyers changements	250	0.125	31.25	2021-11-03 19:21:26.525+01	2021-11-03 19:21:26.525+01	51	\N
160	Espace Locataire dépassement	250	1.5	375	2021-11-03 19:21:26.526+01	2021-11-03 19:21:26.526+01	51	\N
162	Location en plusieurs étapes	250	3	750	2021-11-03 19:21:26.526+01	2021-11-03 19:21:26.526+01	51	\N
163	Location paiement	250	2	500	2021-11-03 19:21:26.526+01	2021-11-03 19:21:26.526+01	51	\N
164	Mise en place charte graphique	250	17.8125	4453.125	2021-11-03 19:21:26.526+01	2021-11-03 19:21:26.526+01	51	\N
165	Avis coloc	250	0.25	62.5	2021-11-03 19:21:26.527+01	2021-11-03 19:21:26.527+01	51	\N
166	Backoffice Annuaire	250	0.25	62.5	2021-11-03 19:21:26.527+01	2021-11-03 19:21:26.527+01	51	\N
167	Backoffice Contacts changements	250	0.25	62.5	2021-11-03 19:21:26.527+01	2021-11-03 19:21:26.527+01	51	\N
168	Mise en place blog	250	2	500	2021-11-03 19:21:26.527+01	2021-11-03 19:21:26.527+01	51	\N
169	Mise en place FAQ	250	1	250	2021-11-03 19:21:26.527+01	2021-11-03 19:21:26.527+01	51	\N
170	Chat	250	5	1250	2021-11-03 19:21:26.527+01	2021-11-03 19:21:26.527+01	51	\N
171	Landing page	250	2	500	2021-11-03 19:21:26.527+01	2021-11-03 19:21:26.527+01	51	\N
172	Authorisations	250	0.5	125	2021-11-03 19:21:26.527+01	2021-11-03 19:21:26.527+01	51	\N
173	Alerte locataire	250	0.5	125	2021-11-03 19:21:26.527+01	2021-11-03 19:21:26.527+01	51	\N
174	Oauth Facebook/Google	250	1.5	375	2021-11-03 19:21:26.527+01	2021-11-03 19:21:26.527+01	51	\N
175	SendinBlue API	250	1.5	375	2021-11-03 19:21:26.527+01	2021-11-03 19:21:26.527+01	51	\N
176	Editeur de texte amélioré	250	0.75	187.5	2021-11-03 19:21:26.527+01	2021-11-03 19:21:26.527+01	51	\N
161	DB Location changements	0	0	0	2021-11-03 19:21:26.526+01	2021-11-03 19:22:19.464+01	51	\N
194		300	50	15000	2021-11-04 18:43:13.979+01	2021-11-04 19:11:04.808+01	53	\N
195	Hébergement Août	51.08	1	51.08	2021-11-06 19:01:37.627+01	2021-11-06 19:01:37.627+01	54	\N
196	Hébergement Septembre	51.08	1	51.08	2021-11-06 19:01:37.627+01	2021-11-06 19:01:37.627+01	54	\N
197	Hébergement Octobre	32.91	1	32.91	2021-11-06 19:01:37.627+01	2021-11-06 19:01:37.627+01	54	\N
177	Praticien : Documents modifiable	300	0.375	112.5	2021-11-03 19:34:31.526+01	2021-11-16 09:43:46.872+01	52	\N
178	BackofficePracticien : Export email	300	0.125	37.5	2021-11-03 19:34:31.526+01	2021-11-16 09:43:46.874+01	52	\N
179	BackofficePracticien : Fichier SEVEANE	300	0.1875	56.25	2021-11-03 19:34:31.526+01	2021-11-16 09:43:46.875+01	52	\N
180	RDV : Convertir en domicile/cabinet	300	0.0625	18.75	2021-11-03 19:34:31.526+01	2021-11-16 09:43:46.877+01	52	\N
181	Zone : Carte statique	300	0.375	112.5	2021-11-03 19:34:31.527+01	2021-11-16 09:43:46.879+01	52	\N
182	Partenariat : Nouvelle rubrique backoffice	300	0.5	150	2021-11-03 19:34:31.527+01	2021-11-16 09:43:46.882+01	52	\N
183	Praticien : Partenariat ostéo	300	0.25	75	2021-11-03 19:34:31.527+01	2021-11-16 09:43:46.884+01	52	\N
184	RDV : rétrocession modifiable 	300	0.25	75	2021-11-03 19:34:31.527+01	2021-11-16 09:43:46.886+01	52	\N
185	Praticien : Voir consultations	300	0.125	37.5	2021-11-03 19:34:31.527+01	2021-11-16 09:43:46.887+01	52	\N
188	Praticien : Espace entreprise	300	0.5	150	2021-11-03 19:34:31.527+01	2021-11-16 09:43:46.888+01	52	\N
189	Demande de RDV : orienté par	300	0.0625	18.75	2021-11-03 19:34:31.527+01	2021-11-16 09:43:46.889+01	52	\N
190	RDV : Notre obligatoire modif retrocéssion	300	0.25	75	2021-11-03 19:34:31.527+01	2021-11-16 09:43:46.89+01	52	\N
186	Standardiste : Droit de modifier les contrats	300	0.0625	18.75	2021-11-03 19:34:31.527+01	2021-11-16 09:43:46.892+01	52	\N
187	Zone : GMB lien par défault	300	0.125	37.5	2021-11-03 19:34:31.527+01	2021-11-16 09:43:46.894+01	52	\N
191	Mail : Facture négative	300	0.25	75	2021-11-03 19:34:31.528+01	2021-11-16 09:43:46.896+01	52	\N
192	Mail : Bug RDV modif notification patient	300	0.125	37.5	2021-11-03 19:34:31.528+01	2021-11-16 09:43:46.899+01	52	\N
193	RDV : DocuSign	300	4	1200	2021-11-03 19:34:31.528+01	2021-11-16 09:43:46.9+01	52	\N
\.


--
-- Data for Name: Invoices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Invoices" (id, "firstName", "lastName", company, address, city, "paymentDate", total, paid, "createdAt", "updatedAt", "CustomerId", "RevenuId", "totalDue") FROM stdin;
15	Matthieu	Cartiller	Patchouli Franchise LE WAGON	20 rue des capucins	Lyon	\N	760	t	2021-10-29 17:17:47.907+02	2021-10-29 17:41:13.622+02	3	4	0
25	Simon	Plinet	REFLEX OSTEO	14 Rue Berjon	Lyon	\N	1600	t	2021-10-29 18:45:15.192+02	2021-10-29 18:48:45.383+02	2	14	0
6	Jonathan	Chaffanjon	Platon Formation	198 chemin de l'abreuvoir	07430 Saint Clair	\N	1330	t	2021-10-28 20:05:01.378+02	2021-10-29 17:45:00.545+02	1	5	0
7	Jonathan	Chaffanjon	Platon Formation	198 chemin de l'abreuvoir	07430 Saint Clair	\N	315	t	2021-10-29 11:28:48.112+02	2021-10-29 17:46:01.497+02	1	6	0
8	Jonathan	Chaffanjon	Platon Formation	198 chemin de l'abreuvoir	07430 Saint Clair	\N	490	t	2021-10-29 11:29:34.265+02	2021-10-29 17:46:19.145+02	1	6	0
9	Jonathan	Chaffanjon	Platon Formation	198 chemin de l'abreuvoir	07430 Saint Clair	\N	350	t	2021-10-29 11:34:29.094+02	2021-10-29 17:51:30.623+02	1	7	0
10	Jonathan	Chaffanjon	Platon Formation	198 chemin de l'abreuvoir	07430 Saint Clair	\N	1470	t	2021-10-29 11:35:32.674+02	2021-10-29 17:54:07.903+02	1	8	0
11	Jonathan	Chaffanjon	Platon Formation	198 chemin de l'abreuvoir	07430 Saint Clair	\N	280	t	2021-10-29 11:35:55.858+02	2021-10-29 17:54:30.048+02	1	9	0
19	Simon	Plinet	REFLEX OSTEO	14 Rue Berjon	Lyon	\N	800	t	2021-10-29 17:50:46.16+02	2021-10-29 17:56:06.325+02	2	9	0
1	Jonathan	Chaffanjon	Platon Formation	198 chemin de l'abreuvoir	07430 Saint Clair	\N	1470	t	2021-10-28 19:51:44.056+02	2021-10-29 11:53:44.909+02	1	1	0
12	Jonathan	Chaffanjon	Platon Formation	198 chemin de l'abreuvoir	07430 Saint Clair	\N	315	t	2021-10-29 11:36:22.867+02	2021-10-29 18:00:41.068+02	1	10	0
26	Simon	Plinet	REFLEX OSTEO	14 Rue Berjon	Lyon	\N	1600	t	2021-10-29 18:46:31.54+02	2021-10-29 18:48:49.833+02	2	15	0
27	Simon	Plinet	REFLEX OSTEO	14 Rue Berjon	Lyon	\N	1600	t	2021-10-29 18:46:48.968+02	2021-10-29 18:48:54.954+02	2	16	0
28	Simon	Plinet	REFLEX OSTEO	14 Rue Berjon	Lyon	\N	1600	t	2021-10-29 18:47:15.591+02	2021-10-29 18:48:59.06+02	2	17	0
31	Simon	Plinet	REFLEX OSTEO	14 Rue Berjon	Lyon	\N	1600	t	2021-10-29 18:52:59.74+02	2021-10-29 18:52:59.74+02	2	22	0
30	Simon	Plinet	REFLEX OSTEO	14 Rue Berjon	Lyon	\N	1600	t	2021-10-29 18:52:18.209+02	2021-10-29 18:53:13.589+02	2	19	0
29	Simon	Plinet	REFLEX OSTEO	14 Rue Berjon	Lyon	\N	1600	t	2021-10-29 18:50:25.994+02	2021-10-29 18:53:39.021+02	2	18	0
16	Thomas	Krief	THOMAS KRIEF ART		Annecy	\N	300	t	2021-10-29 17:21:52.429+02	2021-10-29 17:23:28.514+02	5	\N	0
2	Jonathan	Chaffanjon	Platon Formation	198 chemin de l'abreuvoir	07430 Saint Clair	\N	300	t	2021-10-28 20:00:19.339+02	2021-10-29 17:39:18.653+02	1	2	0
3	Jonathan	Chaffanjon	Platon Formation	198 chemin de l'abreuvoir	07430 Saint Clair	\N	330	t	2021-10-28 20:01:01.226+02	2021-10-29 17:39:36.183+02	1	3	0
4	Jonathan	Chaffanjon	Platon Formation	198 chemin de l'abreuvoir	07430 Saint Clair	\N	1560	t	2021-10-28 20:02:06.659+02	2021-10-29 17:40:45.264+02	1	4	0
5	Jonathan	Chaffanjon	Platon Formation	198 chemin de l'abreuvoir	07430 Saint Clair	\N	280	t	2021-10-28 20:02:30.449+02	2021-10-29 17:40:55.804+02	1	4	0
20	Simon	Plinet	REFLEX OSTEO	14 Rue Berjon	Lyon	\N	400	t	2021-10-29 17:58:41.492+02	2021-10-29 18:04:48.113+02	2	9	0
21	Simon	Plinet	REFLEX OSTEO	14 Rue Berjon	Lyon	\N	560	t	2021-10-29 18:02:38.221+02	2021-10-29 18:06:20.395+02	2	11	0
22	Simon	Plinet	REFLEX OSTEO	14 Rue Berjon	Lyon	\N	1600	t	2021-10-29 18:30:31.642+02	2021-10-29 18:33:20.759+02	2	11	0
23	Simon	Plinet	REFLEX OSTEO	14 Rue Berjon	Lyon	\N	800	t	2021-10-29 18:32:16.896+02	2021-10-29 18:33:42.958+02	2	12	0
13	Jonathan	Chaffanjon	Platon Formation	198 chemin de l'abreuvoir	07430 Saint Clair	\N	500	t	2021-10-29 11:36:46.444+02	2021-10-29 18:35:56.056+02	1	12	0
34	Thomas	Roux	CMCMRS DISTRIBUTION	325 Rue saint pierre	Marseille	\N	4410	t	2021-11-01 15:49:32.312+01	2021-11-03 17:52:06.65+01	4	13	0
45	Claire	Coderey	Roomate		Annecy	\N	3893.75	t	2021-11-01 18:09:39.136+01	2021-11-03 18:11:16.181+01	6	15	0
47	Claire	Coderey	Roomate		Annecy	\N	3412.5	t	2021-11-01 18:45:28.779+01	2021-11-03 18:11:36.549+01	6	18	0
24	Simon	Plinet	REFLEX OSTEO	14 Rue Berjon	Lyon	\N	800	t	2021-10-29 18:44:27.56+02	2021-11-01 16:07:47.237+01	2	13	0
49	Thomas	Roux	CMCMRS DISTRIBUTION	325 Rue saint pierre	Marseille	\N	637.5	t	2021-11-01 18:57:51.981+01	2021-11-03 18:15:27.094+01	4	19	0
44	Thomas	Roux	CMCMRS DISTRIBUTION	325 Rue saint pierre	Marseille	\N	2400	t	2021-11-01 17:52:09.432+01	2021-11-01 18:31:41.091+01	4	16	0
46	Thomas	Roux	CMCMRS DISTRIBUTION	325 Rue saint pierre	Marseille	\N	600	t	2021-11-01 18:34:59.065+01	2021-11-01 18:47:59.511+01	4	17	0
51	Claire	Coderey	Misimo		Annecy	\N	10109.375	\N	2021-11-03 19:21:26.508+01	2021-11-03 19:22:19.459+01	6	22	0
48	Thomas	Roux	CMCMRS DISTRIBUTION	325 Rue saint pierre	Marseille	\N	375	t	2021-11-01 18:56:26.898+01	2021-11-01 18:56:26.898+01	4	19	0
18	Simon	Plinet	REFLEX OSTEO	14 Rue Berjon	Lyon	\N	800	t	2021-10-29 17:47:32.485+02	2021-11-01 19:20:11.006+01	2	7	0
54	Thomas	Roux	CMCMRS DISTRIBUTION	325 Rue saint pierre	Marseille	\N	135.07	\N	2021-11-06 19:01:37.617+01	2021-11-06 19:01:37.617+01	4	\N	0
53	Melvin	Van Megen	test	12 rue soldat ferrari	Hyeres	2021-11-27 00:00:00+01	15000	t	2021-11-04 18:43:13.969+01	2021-11-06 16:43:44.29+01	\N	\N	0
52	Simon	Plinet	REFLEX OSTEO	14 Rue Berjon	Lyon	\N	2287.5	\N	2021-11-03 19:34:31.519+01	2021-11-16 09:43:46.851+01	2	23	0
\.


--
-- Data for Name: Quotations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Quotations" (id, "firstName", "lastName", company, address, city, total, "createdAt", "updatedAt", "CustomerId", "RevenuId", "cautionPaid", "InvoiceId") FROM stdin;
1	Thomas	Roux	CMCMRS DISTRIBUTION	325 Rue saint pierre	Marseille	6300	2021-11-01 11:01:30.896+01	2021-11-03 17:52:42.613+01	4	12	t	34
4	Claire	Coderey	Roomate		Annecy	5562.5	2021-11-01 17:01:05.576+01	2021-11-03 17:47:20.244+01	6	14	t	45
5	Claire	Coderey	Roomate		Annecy	4875	2021-11-01 17:54:21.354+01	2021-11-03 17:47:30.134+01	6	\N	t	47
2	Thomas	Roux	CMCMRS DISTRIBUTION	325 Rue saint pierre	Marseille	3300	2021-11-01 16:30:37.075+01	2021-11-03 17:49:28.718+01	4	14	t	44
\.


--
-- Data for Name: RefreshTokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RefreshTokens" (id, token, "expiryDate", "createdAt", "updatedAt", "UserId") FROM stdin;
43	f60c7a8f-68e6-4fcf-925d-2d4194d10265	2021-11-22 19:42:38.857+01	2021-11-21 19:42:38.857+01	2021-11-21 19:42:38.857+01	\N
44	06847b10-0782-4e71-af0d-caedfdd1be1e	2021-11-27 16:00:33.852+01	2021-11-26 16:00:33.853+01	2021-11-26 16:00:33.853+01	\N
51	070e3ca9-ccc7-4b2f-8524-39e9cfc9078d	2021-11-29 18:38:53.683+01	2021-11-28 18:38:53.683+01	2021-11-28 18:38:53.683+01	\N
\.


--
-- Data for Name: Revenus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Revenus" (id, total, pro, perso, "createdAt", "updatedAt") FROM stdin;
16	4230	4000	230	2021-03-01 00:00:00+01	2021-11-03 11:10:31.675+01
1	1570	1470	100	2019-12-01 00:00:00+01	2021-11-03 11:12:14.426+01
2	889.58	300	589.58	2020-01-01 00:00:00+01	2021-11-03 11:12:20.194+01
3	1076.13	330	746.13	2020-02-01 00:00:00+01	2021-11-03 11:12:28.452+01
4	3070.8	2600	470.8	2020-03-01 00:00:00+01	2021-11-03 11:12:36.203+01
5	1330	1330	0	2020-04-01 00:00:00+02	2021-11-03 11:12:43.501+01
6	832	805	27	2020-05-01 00:00:00+02	2021-11-03 11:12:47.73+01
7	1431	1150	281	2020-06-01 00:00:00+02	2021-11-03 11:12:54.198+01
8	1502	1470	32	2020-07-01 00:00:00+02	2021-11-03 11:13:01.583+01
9	1757.17	1480	277.17	2020-08-01 00:00:00+02	2021-11-03 11:13:05.841+01
10	2010	315	1695	2020-09-01 00:00:00+02	2021-11-03 11:13:10.224+01
11	2456	2160	296	2020-10-01 00:00:00+02	2021-11-03 11:13:14.846+01
17	2400	2200	200	2021-04-01 00:00:00+02	2021-11-03 11:13:43.374+01
20	412.44	0	412.44	2021-07-01 00:00:00+02	2021-11-03 11:13:55.529+01
12	3190	3190	0	2020-11-01 00:00:00+01	2021-11-03 14:17:24.518+01
14	4517.75	4258.75	259	2021-01-01 00:00:00+01	2021-11-03 14:20:11.938+01
19	3411.6400000000003	2612.5	799.1400000000001	2021-06-01 00:00:00+02	2021-11-03 18:12:47.364+01
18	5412.5	5012.5	400	2021-05-01 00:00:00+02	2021-11-03 18:12:52.318+01
15	6062.18	5493.75	568.43	2021-02-01 00:00:00+01	2021-11-03 18:13:10.019+01
13	7115.53	5210	1905.53	2020-12-01 00:00:00+01	2021-11-03 18:13:16.538+01
24	0	0	0	2021-11-01 00:00:00+01	2021-11-04 11:19:56.249+01
22	12614.375	11709.375	905	2021-09-01 00:00:00+02	2021-11-06 18:33:58.84+01
23	3768.55	2668.75	1099.8	2021-10-01 00:00:00+02	2021-11-06 18:35:46.361+01
21	579.69	0	579.69	2021-08-01 00:00:00+02	2021-11-06 18:57:11.164+01
\.


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20211025072342-create-user.js
20211025072829-create-customer.js
20211025073357-create-revenu.js
20211025073553-create-invoice.js
20211025073838-create-quotation.js
20211025073950-create-invoice-item.js
20211025074030-create-credit.js
20211025074051-create-cost.js
20211027163111-create-refresh-token.js
20211101111036-add_fields_to_quotations.js
20211101143632-add-invoice-id-to-quotation.js
20211103162145-add-total-due-to-invoices.js
20211126074051-create-crypto.js
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, password, email, "createdAt", "updatedAt") FROM stdin;
1	$2a$12$qFqdRT8NvvggcMey88ok3uXHY0qHJy09Usy2zSDj/yge0TmIP6lwi	melvin.vmegen@gmail.com	2021-10-28 19:47:09.635+02	2021-10-28 19:47:09.635+02
\.


--
-- Data for Name: costs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.costs (id, name, total, "createdAt", "updatedAt", "revenuId") FROM stdin;
\.


--
-- Data for Name: credits; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.credits (id, reason, creditor, total, "createdAt", "updatedAt", "revenuId") FROM stdin;
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (id, firstname, lastname, company, email, phone, address, city, siret, "createdAt", "updatedAt") FROM stdin;
1	Martin	Jean	test	\N	0764470724	123 rue tete d'or	\N	\N	2021-10-25 18:30:20.394+02	2021-10-25 18:30:20.394+02
\.


--
-- Data for Name: invoiceItems; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."invoiceItems" (id, quantity, unit, total, name, "createdAt", "updatedAt", "invoiceId", "quotationId") FROM stdin;
1	10	25	250	\N	2021-10-25 18:30:20.409+02	2021-10-25 18:30:20.409+02	1	\N
2	10	30	250	\N	2021-10-25 18:30:20.409+02	2021-10-25 18:30:20.409+02	1	\N
\.


--
-- Data for Name: invoice_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.invoice_items (id, quantity, unit, total, name, "createdAt", "updatedAt", "invoiceId") FROM stdin;
1	2	25	50	\N	2021-09-03 15:50:20.734+02	2021-09-03 15:50:20.734+02	\N
\.


--
-- Data for Name: invoiceitems; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.invoiceitems (id, quantity, unit, total, name, "createdAt", "updatedAt", "invoiceId") FROM stdin;
\.


--
-- Data for Name: invoices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.invoices (id, firstname, lastname, company, address, city, payment_date, total, paid, "createdAt", "updatedAt", "customerId", "revenuId") FROM stdin;
1	Martin	Jean	test	\N	\N	\N	0	f	2021-10-25 18:30:20.405+02	2021-10-25 18:30:20.405+02	1	1
\.


--
-- Data for Name: quotations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quotations (id, firstname, lastname, company, address, city, total, "createdAt", "updatedAt", "customerId") FROM stdin;
\.


--
-- Data for Name: revenus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.revenus (id, total, pro, perso, "createdAt", "updatedAt") FROM stdin;
1	NaN	0	0	2021-10-25 18:30:20.395+02	2021-10-25 18:30:20.395+02
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: Costs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Costs_id_seq"', 25, true);


--
-- Name: Credits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Credits_id_seq"', 103, true);


--
-- Name: Cryptos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Cryptos_id_seq"', 1, true);


--
-- Name: Customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Customers_id_seq"', 8, true);


--
-- Name: InvoiceItems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."InvoiceItems_id_seq"', 197, true);


--
-- Name: Invoices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Invoices_id_seq"', 54, true);


--
-- Name: Quotations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Quotations_id_seq"', 5, true);


--
-- Name: RefreshTokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RefreshTokens_id_seq"', 51, true);


--
-- Name: Revenus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Revenus_id_seq"', 24, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 1, true);


--
-- Name: costs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.costs_id_seq', 1, false);


--
-- Name: credits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.credits_id_seq', 1, false);


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customers_id_seq', 1, true);


--
-- Name: invoiceItems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."invoiceItems_id_seq"', 2, true);


--
-- Name: invoice_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.invoice_items_id_seq', 1, true);


--
-- Name: invoiceitems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.invoiceitems_id_seq', 1, false);


--
-- Name: invoices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.invoices_id_seq', 1, true);


--
-- Name: quotations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quotations_id_seq', 1, false);


--
-- Name: revenus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.revenus_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: Costs Costs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Costs"
    ADD CONSTRAINT "Costs_pkey" PRIMARY KEY (id);


--
-- Name: Credits Credits_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Credits"
    ADD CONSTRAINT "Credits_pkey" PRIMARY KEY (id);


--
-- Name: Cryptos Cryptos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cryptos"
    ADD CONSTRAINT "Cryptos_pkey" PRIMARY KEY (id);


--
-- Name: Customers Customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Customers"
    ADD CONSTRAINT "Customers_pkey" PRIMARY KEY (id);


--
-- Name: InvoiceItems InvoiceItems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."InvoiceItems"
    ADD CONSTRAINT "InvoiceItems_pkey" PRIMARY KEY (id);


--
-- Name: Invoices Invoices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Invoices"
    ADD CONSTRAINT "Invoices_pkey" PRIMARY KEY (id);


--
-- Name: Quotations Quotations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Quotations"
    ADD CONSTRAINT "Quotations_pkey" PRIMARY KEY (id);


--
-- Name: RefreshTokens RefreshTokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RefreshTokens"
    ADD CONSTRAINT "RefreshTokens_pkey" PRIMARY KEY (id);


--
-- Name: Revenus Revenus_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Revenus"
    ADD CONSTRAINT "Revenus_pkey" PRIMARY KEY (id);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: costs costs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.costs
    ADD CONSTRAINT costs_pkey PRIMARY KEY (id);


--
-- Name: credits credits_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credits
    ADD CONSTRAINT credits_pkey PRIMARY KEY (id);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: invoiceItems invoiceItems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."invoiceItems"
    ADD CONSTRAINT "invoiceItems_pkey" PRIMARY KEY (id);


--
-- Name: invoice_items invoice_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoice_items
    ADD CONSTRAINT invoice_items_pkey PRIMARY KEY (id);


--
-- Name: invoiceitems invoiceitems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoiceitems
    ADD CONSTRAINT invoiceitems_pkey PRIMARY KEY (id);


--
-- Name: invoices invoices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_pkey PRIMARY KEY (id);


--
-- Name: quotations quotations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quotations
    ADD CONSTRAINT quotations_pkey PRIMARY KEY (id);


--
-- Name: revenus revenus_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.revenus
    ADD CONSTRAINT revenus_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: Costs Costs_RevenuId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Costs"
    ADD CONSTRAINT "Costs_RevenuId_fkey" FOREIGN KEY ("RevenuId") REFERENCES public."Revenus"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Credits Credits_RevenuId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Credits"
    ADD CONSTRAINT "Credits_RevenuId_fkey" FOREIGN KEY ("RevenuId") REFERENCES public."Revenus"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: InvoiceItems InvoiceItems_InvoiceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."InvoiceItems"
    ADD CONSTRAINT "InvoiceItems_InvoiceId_fkey" FOREIGN KEY ("InvoiceId") REFERENCES public."Invoices"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: InvoiceItems InvoiceItems_QuotationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."InvoiceItems"
    ADD CONSTRAINT "InvoiceItems_QuotationId_fkey" FOREIGN KEY ("QuotationId") REFERENCES public."Quotations"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Invoices Invoices_CustomerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Invoices"
    ADD CONSTRAINT "Invoices_CustomerId_fkey" FOREIGN KEY ("CustomerId") REFERENCES public."Customers"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Invoices Invoices_RevenuId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Invoices"
    ADD CONSTRAINT "Invoices_RevenuId_fkey" FOREIGN KEY ("RevenuId") REFERENCES public."Revenus"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Quotations Quotations_CustomerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Quotations"
    ADD CONSTRAINT "Quotations_CustomerId_fkey" FOREIGN KEY ("CustomerId") REFERENCES public."Customers"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Quotations Quotations_InvoiceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Quotations"
    ADD CONSTRAINT "Quotations_InvoiceId_fkey" FOREIGN KEY ("InvoiceId") REFERENCES public."Invoices"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Quotations Quotations_RevenuId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Quotations"
    ADD CONSTRAINT "Quotations_RevenuId_fkey" FOREIGN KEY ("RevenuId") REFERENCES public."Revenus"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: RefreshTokens RefreshTokens_UserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RefreshTokens"
    ADD CONSTRAINT "RefreshTokens_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: costs costs_revenuId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.costs
    ADD CONSTRAINT "costs_revenuId_fkey" FOREIGN KEY ("revenuId") REFERENCES public.revenus(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: credits credits_revenuId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credits
    ADD CONSTRAINT "credits_revenuId_fkey" FOREIGN KEY ("revenuId") REFERENCES public.revenus(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: invoiceItems invoiceItems_invoiceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."invoiceItems"
    ADD CONSTRAINT "invoiceItems_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES public.invoices(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: invoiceItems invoiceItems_quotationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."invoiceItems"
    ADD CONSTRAINT "invoiceItems_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES public.quotations(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: invoices invoices_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT "invoices_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public.customers(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: invoices invoices_revenuId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT "invoices_revenuId_fkey" FOREIGN KEY ("revenuId") REFERENCES public.revenus(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: quotations quotations_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quotations
    ADD CONSTRAINT "quotations_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public.customers(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

