import React, { Component } from "react";
import "./App.css";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import axios from "axios";
import Popup from "react-popup";
import "./Popup.css";
import {
  Form,
  FormGroup,
  InputGroup,
  Button,
  Input,
  Label,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

class App extends Component {
  constructor() {
    super();
    this.state = {
      animes: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getAllAnimes = () => {
    axios
      .get("/getAllAnimes")
      .then((result) => {
        this.setState({ animes: result.data });
        console.log(this.state.animes);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.getAllAnimes();
  }

  handleSubmit(e) {
    const query = `/getAnime?title=${this.input.value}`;

    console.log(query);
    e.preventDefault();
    axios
      .get(query)
      .then((result) => {
        console.log(result);
        if (result.data === "Not found") {
          Popup.alert("Anime Not Found");
        }
        this.getAllAnimes();
      })
      .catch((error) => {
        alert("Anime title is required! Please try again!");
      });
  }

  deleteRecord = (value) => {
    console.log("to delete: ", value);
    const query = `/deleteAnime?title=${value}`;
    axios
      .get(query)
      .then((result) => {
        this.getAllAnimes();
      })
      .catch((error) => {
        alert("Error: ", error);
      });
  };

  render() {
    var data = this.state.animes;
    data = data.reverse();

    return (
      <div className="App">
        <div className="container-fluid search">
          <div className="col-sm-12">
            <h1 className="m-5 mb-0 d-flex justify-content-start text-light">
              uAnime
            </h1>
            <h3 className="m-5 mt-2 d-flex justify-content-start text-light">
              Let's discover anime here!
            </h3>
            <Form className="m-5" onSubmit={this.handleSubmit}>
              <FormGroup>
                <InputGroup>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search for..."
                    ref={(input) => (this.input = input)}
                  />
                  <Button type="submit" color="warning">
                    Search
                  </Button>
                </InputGroup>
              </FormGroup>
            </Form>
          </div>
          <div>
            <Popup />
          </div>
        </div>

        <div className="container-fluid table">
          <div className="col-sm-12">
            <p />
            <ReactTable
              data={data}
              columns={[
                {
                  Header: "Title & Poster",
                  // accessor: "animeTitle",
                  Cell: (row) => {
                    return (
                      <div>
                        <img height={150} src={row.original.animeImage} />
                        <p>{row.original.animeTitle}</p>
                      </div>
                    );
                  },
                },
                {
                  Header: "Score",
                  accessor: "animeScore",
                },
                {
                  Header: "Episodes",
                  accessor: "animeEpisodes",
                },
                {
                  Header: "Synopsis",
                  accessor: "animeSynopsis",
                  style: { "white-space": "unset" },
                },
                {
                  Header: "Related News",
                  style: { "white-space": "unset" },
                  Cell: (row) => {
                    return (
                      <div>
                        <a href={row.original.newsLink} target="_blank">
                          {row.original.newsTitle}
                        </a>
                        <p>{row.original.newsPubDate}</p>
                      </div>
                    );
                  },
                },
                {
                  Header: "Delete",
                  accessor: "animeTitle",
                  Cell: ({ value }) => (
                    <Button
                      color="danger"
                      onClick={() => {
                        this.deleteRecord(value);
                      }}
                    >
                      Delete
                    </Button>
                  ),
                },
              ]}
              defaultPageSize={5}
              className="-striped -highlight"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
