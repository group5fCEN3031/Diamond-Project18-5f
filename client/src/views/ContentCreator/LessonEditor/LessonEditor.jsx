import { Button, Form, Input, message, Modal } from "antd"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { getLessonModule, updateLessonModule} from "../../../Utils/requests"
import ActivityEditor from "../ActivityEditor/ActivityEditor"
import VideoEditor from '../VideoEditor/Editor'; // Import the VideoEditor component


export default function LessonEditor({
  learningStandard,
  viewing,
  setViewing,
  tab,
  page,
}) {
  const [visible, setVisible] = useState(false)
  const [name, setName] = useState(learningStandard.name)
  const [description, setDescription] = useState("")
  const [standards, setStandards] = useState("")
  const [youtubeLink, setYoutubeLink] = useState("")
  const [videolink, setVideoLink] = useState("")
  const [additionalLink, setAdditionalLink] = useState("")
  const [youtubeLinkError, setYoutubeLinkError] = useState(false)
  const [videoLinkError, setVideoLinkError] = useState(false)
  const [additionalLinkError, setAdditionalLinkError] = useState(false)
  const [displayName, setDisplayName] = useState(learningStandard.name)
  // eslint-disable-next-line
  const [_, setSearchParams] = useSearchParams()

  const showModal = async () => {
    setVisible(true)
    const res = await getLessonModule(learningStandard.id)
    setName(res.data.name)
    setDescription(res.data.expectations)
    setStandards(res.data.standards)
    setYoutubeLink(res.data.youtubeLink)
    setAdditionalLink(res.data.additionalLink)
    setAdditionalLinkError(false)
    setVideoLink(res.data.videolink)
    setVideoLinkError(false)
    setYoutubeLinkError(false)

  }

  const handleYouTubeLinkChange = (event) => {
    setYoutubeLink(event.target.value);
    setYoutubeLinkError(false);
  };

  const handleVideoLinkChange = (event) => {
    setVideoLink(event.target.value);
    setVideoLinkError(false);
  };

  const getYouTubeEmbedLink = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  useEffect(() => {
    setDisplayName(learningStandard.name)
  }, [learningStandard.name])

  const handleCancel = () => {
    setVisible(false)
  }
  const handleSubmit = async () => {
    if (youtubeLink) {
      const goodYoutube = checkURL(youtubeLink)
      if (!goodYoutube) {
        setYoutubeLinkError(true)
        message.error("Please Enter a valid URL starting with HTTP/HTTPS", 4)
        return
      }
    }
    if (videolink) {
      const goodvid = checkURL(videolink)
      if(!goodvid) {
        setVideoLinkError(true)
        message.error("Please Enter a valid URL starting with HTTP/HTTPS", 4)
        return
      }
    }
    if (additionalLink) {
      const goodAdditional = checkURL(additionalLink)
      if (!goodAdditional) {
        setAdditionalLinkError(true)
        message.error("Please Enter a valid URL starting with HTTP/HTTPS", 4)
        return
      }
    }
    const response = await updateLessonModule(
      learningStandard.id,
      name,
      description,
      standards,
      additionalLink,
      youtubeLink
    )
    if (response.err) {
      message.error("Fail to update lesson")
    } else {
      message.success("Update lesson success")
      setDisplayName(name)
      setSearchParams({ tab, page, activity: response.data.id })
      setViewing(response.data.id)
      setVisible(false)
    }
  }

  const checkURL = n => {
    const regex =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g
    if (n.search(regex) === -1) {
      return null
    }
    return n
  }

  return (
    <div>
      <button id="link-btn" onClick={showModal}>
        {displayName}
      </button>
      <Modal
        title="Lesson Editor"
        open={visible}
        width="35vw"
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          id="add-units"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          onFinish={handleSubmit}
          layout="horizontal"
          size="default"
        >
          <Form.Item id="form-label" label="Lesson Name">
            <Input
              onChange={e => setName(e.target.value)}
              value={name}
              required
              placeholder="Enter lesson name"
            />
          </Form.Item>
          <Form.Item id="form-label" label="Description">
            <Input.TextArea
              onChange={e => setDescription(e.target.value)}
              value={description}
              rows={3}
              required
              placeholder="Enter lesson description"
            />
          </Form.Item>
          <Form.Item id="form-label" label="Standards">
            <Input
              onChange={e => setStandards(e.target.value)}
              value={standards}
              required
              placeholder="Enter lesson standards"
            />
          </Form.Item>
          
        <Form.Item label="Link to Additional Resources (Optional)">
          <Input
            onChange={e => {
              setAdditionalLink(e.target.value)
              setAdditionalLinkError(false)
            }}
            style={additionalLinkError ? { backgroundColor: "#FFCCCC" } : {}}
            value={additionalLink}
            placeholder="Enter a link"
          />
        </Form.Item>

        <Form.Item
          id="form-label"
          label="Upload Video  Link   "
        >
          <Input
            onChange={e => {
              setVideoLink(e.target.value)
              setVideoLinkError(false)
            }}
            className="input"
            onchange={handleVideoLinkChange}
            value={videolink}
            style={videoLinkError ? { backgroundColor: "#FFCCCC" } : {}}
            placeholder="Enter video link"
          />
        </Form.Item>
        
        <Form.Item> 
          {videolink && <VideoEditor videoLink={videolink} />}
        </Form.Item>
        
      {/* {youtubeLink && (
        <iframe
          width="560"
          height="315"
          src={getYouTubeEmbedLink(youtubeLink)}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )} */}
          
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
            style={{ marginBottom: "0px" }}
          >
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="content-creator-button"
            >
              Next
            </Button>
            <Button
              onClick={handleCancel}
              size="large"
              className="content-creator-button"
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {!visible ? (
        <ActivityEditor
          learningStandard={learningStandard}
          viewing={viewing}
          setViewing={setViewing}
          page={page}
          tab={tab}
        />
      ) : null}
    </div>
  )
}
