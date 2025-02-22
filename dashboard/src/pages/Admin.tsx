import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LeaveServer from "components/LeaveServer";
import Loader from "components/Loader";
import ServerCard from "components/ServerCard";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  InputGroup,
  Row,
  Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFetchAdminServersQuery } from "store/api";
import { ServerPartial } from "types";

const Admin = () => {
  const serversQuery = useFetchAdminServersQuery();
  const [servers, setServers] = useState<ServerPartial[]>([]);
  const [searchServer, setSearchServer] = useState("");

  useEffect(() => {
    if (serversQuery.data) {
      setServers(
        serversQuery.data.filter(
          (server) =>
            server.id.includes(searchServer.replace("#", "")) ||
            server.name
              .toLocaleLowerCase()
              .includes(searchServer.toLocaleLowerCase())
        )
      );
    }
  }, [searchServer, serversQuery]);

  if (serversQuery.isFetching) {
    return (
      <Loader width={500} height={500}>
        <rect x="160" y="10" rx="0" ry="0" width="210" height="15" />
        <rect x="15" y="45" rx="5" ry="5" width="475" height="40" />
        <rect x="15" y="95" rx="5" ry="5" width="475" height="40" />
        <rect x="15" y="145" rx="5" ry="5" width="475" height="40" />
        <rect x="15" y="195" rx="5" ry="5" width="475" height="40" />
        <rect x="15" y="245" rx="5" ry="5" width="475" height="40" />
        <rect x="15" y="295" rx="5" ry="5" width="475" height="40" />
        <rect x="15" y="345" rx="5" ry="5" width="475" height="40" />
        <rect x="15" y="395" rx="5" ry="5" width="475" height="40" />
        <rect x="15" y="445" rx="5" ry="5" width="475" height="40" />
      </Loader>
    );
  }

  const renderServer = (server: ServerPartial) => {
    return (
      <ServerCard key={server.id} server={server} list>
        <Stack gap={2} direction="horizontal">
          <Link to={`/admin/${server.id}`}>
            <Button variant="primary">Manage</Button>
          </Link>

          <Link to={`/dashboard/${server.id}`}>
            <Button variant="primary">Dashboard</Button>
          </Link>

          <LeaveServer server={server} />
        </Stack>
      </ServerCard>
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-center pt-3">
        <h1>Discord Servers</h1>
      </div>

      <Card className="p-2">
        <Form onSubmit={() => serversQuery.refetch()}>
          <Form.Group controlId="search">
            <Form.Label>Search</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                aria-describedby="search-help"
                placeholder="Search servers"
                value={searchServer}
                onChange={(e) => setSearchServer(e.target.value)}
              />
              <Button variant="primary" type="submit">
                <FontAwesomeIcon icon={faRefresh} />
              </Button>
            </InputGroup>
          </Form.Group>
        </Form>
      </Card>

      <Container fluid className="py-4">
        <Row className="g-4">
          {servers.map(renderServer)}
          {servers.length === 0 && (
            <h5 className="d-flex justify-content-center py-5">
              No servers to display.
            </h5>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Admin;
