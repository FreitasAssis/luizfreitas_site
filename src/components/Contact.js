import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBBtn, MDBInput } from "mdbreact";

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.state = {
          status: "",
          name: "",
          email: "",
          subject: "",
          message: ""
        };
    }

    submit(ev) {
        ev.preventDefault();
        ev.target.className += " was-validated";
        if (this.state.name !== "" && this.state.email !== "" && this.state.subject !== "" && this.state.message !== "") {
            const form = ev.target;
            const data = new FormData(form);
            const xhr = new XMLHttpRequest();
            xhr.open(form.method, form.action);
            xhr.setRequestHeader("Accept", "application/json");
            xhr.onreadystatechange = () => {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status === 200) {
                form.reset();
                this.setState({ status: "SUCCESS"});
            } else {
                this.setState({ status: "ERROR" });
            }
            };
            xhr.send(data)
        }
    }

    clear = () => {
        this.setState({name: "", email: "", subject: "", message: ""})
    }

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { status } = this.state
        return (
            <section id="contact" className="my-5 blue-grey-text">
                <MDBRow className="p-3 m-0">
                    <MDBCol lg="5" className="lg-0 mb-4">
                        <MDBCard>
                            <MDBCardBody>
                                <div className="form-header blue-gray accent-1">
                                    <h3 className="mt-2">
                                    <MDBIcon icon="envelope" /> Contato:
                                    </h3>
                                </div>
                                <p>
                                    Para orçamento de projeto, propostas e assuntos relacionados, me envie um email que responderei no prazo máximo de 24h.
                                </p>
                                <form
                                    className="needs-validation"
                                    onSubmit={this.submit}
                                    action="https://formspree.io/xbjzaoyy"
                                    method="POST"
                                    noValidate
                                >
                                    <div className="md-form">
                                        <MDBInput
                                        icon="user"
                                        label="Seu nome"
                                        iconClass="blue-grey-text"
                                        type="text"
                                        id="form-name"
                                        required
                                        value={this.state.name} name="name" onChange={this.changeHandler}
                                        />
                                    </div>
                                    <div className="md-form">
                                        <MDBInput
                                        icon="envelope"
                                        label="Seu email"
                                        iconClass="blue-grey-text"
                                        type="email"
                                        id="form-email"
                                        required
                                        value={this.state.email} name="email" onChange={this.changeHandler}
                                        />
                                    </div>
                                    <div className="md-form">
                                        <MDBInput
                                        icon="tag"
                                        label="Assunto"
                                        iconClass="blue-grey-text"
                                        type="text"
                                        id="form-subject"
                                        required
                                        value={this.state.subject} name="subject" onChange={this.changeHandler}
                                        />
                                    </div>
                                    <div className="md-form">
                                        <MDBInput
                                        icon="pencil-alt"
                                        label="Mensagem"
                                        iconClass="blue-grey-text"
                                        type="textarea"
                                        id="form-text"
                                        required
                                        value={this.state.message} name="message" onChange={this.changeHandler}
                                        />
                                    </div>
                                    <div className="text-center">
                                        {status === "SUCCESS" ?
                                            <p>Obrigado! Aguarde que em breve retorno seu email!</p> :
                                            <MDBBtn type="submit" rounded outline color="blue">Enviar</MDBBtn>}
                                        {status === "ERROR" && <p>Ooops! There was an error.</p>}
                                    </div>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg="7">
                        <div
                            id="map-container"
                            className="rounded z-depth-1-half map-container"
                            style={{ height: "400px" }}
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.1664824084837!2d-35.20765988523285!3d-5.832139895774142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b2ff75c341eaaf%3A0x9e690237eaddaf9a!2sIMD%2FUFRN%20-%20Instituto%20Metr%C3%B3pole%20Digital!5e0!3m2!1spt-BR!2sbr!4v1593182169908!5m2!1spt-BR!2sbr"
                                title="This is a unique title"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0 }}
                            />
                        </div>
                        <br />
                        <MDBRow className="text-center">
                            <MDBCol md="4" className="d-flex flex-column align-items-center">
                                <div className="block-example border border-primary Ripple-parent d-flex align-items-center justify-content-center blue-text mb-2" style={{borderRadius: "50%", width: "7vh", height: "7vh"}}>
                                    <h2 className="m-0"><MDBIcon icon="map-marker-alt" /></h2>
                                </div>
                                <p className="mb-md-0">IMD</p>
                                <p className="mb-md-0">Bloco A - Sala 414</p>
                            </MDBCol>
                            <MDBCol md="4" className="d-flex flex-column align-items-center">
                                <div className="block-example border border-primary Ripple-parent d-flex align-items-center justify-content-center blue-text mb-2" style={{borderRadius: "50%", width: "7vh", height: "7vh"}}>
                                    <h2 className="m-0"><MDBIcon icon="phone" /></h2>
                                </div>
                                <p className="mb-md-0">(84) 981265062</p>
                                <p className="mb-md-0">Seg - Sex, 8:00-18:00</p>
                            </MDBCol>
                            <MDBCol md="4" className="d-flex flex-column align-items-center">
                                <div className="block-example border border-primary Ripple-parent d-flex align-items-center justify-content-center blue-text mb-2" style={{borderRadius: "50%", width: "7vh", height: "7vh"}}>
                                    <h2 className="m-0"><MDBIcon icon="envelope" /></h2>
                                </div>
                                <p className="mb-md-0">luiz_dev@outlook.com</p>
                                <p className="mb-md-0">Resposta em até 24h</p>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </section>
        )
    }
}

export default Contact;